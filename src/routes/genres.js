const KoaRouter = require('koa-router');
const _ = require('lodash');

const router = new KoaRouter();

router.param('kebab', async (kebab, ctx, next) => {
  const name = _.startCase(_.camelCase(kebab));
  const genre = await ctx.orm.Genre.findOne({ where: { name: { $iLike: `${name}%` } } });
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
  const genres = await ctx.orm.Genre.findAll({ order: [['name', 'ASC']] });
  await ctx.render('genres/index', {
    genres,
    buildGenrePath: genre => ctx.router.url('genres-show', _.kebabCase(genre.name)),
  });
});

router.get('genres-new', '/new', async (ctx) => {
  const genre = ctx.orm.Genre.build();
  await ctx.render('genres/new', {
    genre,
    submitGenrePath: ctx.router.url('genres-create'),
  });
});

router.get('genres-edit', '/:id/edit', async (ctx) => {
  const { genre } = ctx.state;
  await ctx.render('genres/edit', {
    genre,
    submitGenrePath: ctx.router.url('genres-update', genre.id),
  });
});

router.post('genres-create', '/', async (ctx) => {
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

router.patch('genres-update', '/:id', async (ctx) => {
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

router.get('genres-show', '/:kebab', async (ctx) => {
  const { genre } = ctx.state;
  const page = parseInt(ctx.query.page, 10) || 1;
  const books = await genre.getBooks({ offset: (page - 1) * 10, limit: 10 });
  await ctx.render('genres/show', {
    books,
    genre,
    editGenrePath: ctx.router.url('genres-edit', genre.id),
    destroyGenrePath: ctx.router.url('genres-destroy', genre.id),
    buildBookPath: book => ctx.router.url('books-show', book.isbn),
    page,
    previousPagePath: ctx.router.url('genres-show', _.kebabCase(genre.name), { query: { page: page - 1 } }),
    nextPagePath: ctx.router.url('genres-show', _.kebabCase(genre.name), { query: { page: page + 1 } }),
  });
});

router.delete('genres-destroy', '/:id', async (ctx) => {
  const { genre } = ctx.state;
  await genre.destroy();
  ctx.redirect(ctx.router.url('genres'));
});

module.exports = router;
