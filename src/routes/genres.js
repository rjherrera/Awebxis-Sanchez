const KoaRouter = require('koa-router');
const _ = require('lodash');
const { isAdmin } = require('../lib/routes/permissions');
const { Author, Book } = require('../models');

const router = new KoaRouter();

router.param('kebabName', async (kebabName, ctx, next) => {
  const name = _.startCase(_.camelCase(kebabName));
  const genre = await ctx.orm.Genre.findOne({
    order: [['name', 'ASC']],
    where: { name: { $iLike: `${name}%` } },
  });
  ctx.assert(genre, 404);
  ctx.state.genre = genre;
  return next();
});

router.param('id', async (id, ctx, next) => {
  const genre = await ctx.orm.Genre.findOne({ where: { id } });
  ctx.assert(genre, 404);
  ctx.state.genre = genre;
  return next();
});

router.get('genres', '/', async (ctx) => {
  const page = parseInt(ctx.query.page, 10) || 1;
  const q = ctx.query.q || '';
  const genres = await ctx.orm.Genre.findAllPaged({
    order: [['name', 'ASC']],
    include: [{
      model: Book,
      as: 'books',
      limit: 1,
      separate: false,
    }],
    where: { name: { $iLike: `%${q}%` } },
  }, page);
  await ctx.render('genres/index', {
    genres,
    newGenrePath: ctx.router.url('genres-new'),
    page,
    isLastPage: genres.isLastPage,
    q,
    previousPagePath: ctx.router.url('genres', { query: { page: page - 1, q } }),
    nextPagePath: ctx.router.url('genres', { query: { page: page + 1, q } }),
  });
});

router.get('genres-new', '/new', isAdmin, async (ctx) => {
  const genre = ctx.orm.Genre.build();
  await ctx.render('genres/new', {
    genre,
    submitGenrePath: ctx.router.url('genres-create'),
  });
});

router.get('genres-edit', '/:kebabName/edit', isAdmin, async (ctx) => {
  const { genre } = ctx.state;
  await ctx.render('genres/edit', {
    genre,
    submitGenrePath: ctx.router.url('genres-update', genre.id),
  });
});

router.post('genres-create', '/', isAdmin, async (ctx) => {
  try {
    const genre = await ctx.orm.Genre.create(ctx.request.body);
    ctx.redirect(ctx.router.url('genres-show', _.kebabCase(genre.name)));
  } catch (validationError) {
    await ctx.render('genres/new', {
      genre: ctx.orm.Genre.build(ctx.request.body),
      errors: validationError.errors,
      submitGenrePath: ctx.router.url('genres-create'),
    });
  }
});

router.patch('genres-update', '/:id', isAdmin, async (ctx) => {
  const { genre } = ctx.state;
  try {
    await genre.update(ctx.request.body);
    ctx.redirect(ctx.router.url('genres-show', _.kebabCase(genre.name)));
  } catch (validationError) {
    await ctx.render('genres/edit', {
      genre,
      errors: validationError.errors,
      submitGenrePath: ctx.router.url('genres-update', genre.id),
    });
  }
});

router.get('genres-show', '/:kebabName', async (ctx) => {
  const { genre } = ctx.state;
  const page = parseInt(ctx.query.page, 10) || 1;
  const books = await genre.getBooks({
    offset: (page - 1) * ctx.state.pageSize,
    limit: ctx.state.pageSize,
    include: [{ model: Author, as: 'author' }],
  });
  await ctx.render('genres/show', {
    books,
    genre,
    editGenrePath: ctx.router.url('genres-edit', _.kebabCase(genre.name)),
    destroyGenrePath: ctx.router.url('genres-destroy', genre.id),
    page,
    previousPagePath: ctx.router.url('genres-show', _.kebabCase(genre.name), { query: { page: page - 1 } }),
    nextPagePath: ctx.router.url('genres-show', _.kebabCase(genre.name), { query: { page: page + 1 } }),
  });
});

router.delete('genres-destroy', '/:id', isAdmin, async (ctx) => {
  const { genre } = ctx.state;
  await genre.destroy();
  ctx.redirect(ctx.state.genresPath);
});

module.exports = router;
