const KoaRouter = require('koa-router');
const _ = require('lodash');
const { isValidationError, getFirstErrors } = require('../lib/models/validation-error');
const { Book } = require('../models');

const router = new KoaRouter();

router.param('kebabName', async (kebabName, ctx, next) => {
  const author = await ctx.orm.Author.findOne({
    order: [['name', 'ASC']],
    where: { kebabName },
  });
  ctx.assert(author, 404);
  ctx.state.author = author;
  return next();
});

router.get('authors', '/', async (ctx) => {
  const page = parseInt(ctx.query.page, 10) || 1;
  const q = ctx.query.q || '';
  const authors = await ctx.orm.Author.findAll({
    offset: (page - 1) * ctx.state.pageSize,
    limit: ctx.state.pageSize,
    order: [['name', 'ASC']],
    include: [{ model: Book, as: 'books', limit: 1 }],
    where: { name: { $iLike: `%${q}%` } },
  });
  await ctx.render('authors/index', {
    authors,
    newAuthorPath: ctx.router.url('authors-new'),
    page,
    q,
    previousPagePath: ctx.router.url('authors', { query: { page: page - 1, q } }),
    nextPagePath: ctx.router.url('authors', { query: { page: page + 1, q } }),
  });
});

router.get('authors-new', '/new', async (ctx) => {
  const author = ctx.orm.Author.build();
  await ctx.render('authors/new', {
    author,
    submitAuthorPath: ctx.router.url('authors-create'),
  });
});

router.get('authors-edit', '/:kebabName/edit', async (ctx) => {
  const { author } = ctx.state;
  await ctx.render('authors/edit', {
    author,
    submitAuthorPath: ctx.router.url('authors-update', author.kebabName),
  });
});

router.post('authors-create', '/', async (ctx) => {
  const { name } = ctx.request.body;
  const author = await ctx.orm.Author.build({ name, kebabName: _.kebabCase(name) });
  try {
    await author.save(ctx.request.body);
    ctx.redirect(ctx.router.url('authors-show', author.kebabName));
  } catch (error) {
    if (!isValidationError(error)) throw error;
    await ctx.render('authors/new', {
      author,
      errors: getFirstErrors(error),
      submitAuthorPath: ctx.router.url('authors-create'),
    });
  }
});

router.patch('authors-update', '/:kebabName', async (ctx) => {
  const { author } = ctx.state;
  const { name } = ctx.request.body;
  try {
    await author.update({ name, kebabName: _.kebabCase(name) });
    ctx.redirect(ctx.router.url('authors-show', author.kebabName));
  } catch (error) {
    if (!isValidationError(error)) throw error;
    await ctx.render('authors/edit', {
      author,
      errors: getFirstErrors(error),
      submitAuthorPath: ctx.router.url('authors-update', author.kebabName),
    });
  }
});

router.get('authors-show', '/:kebabName', async (ctx) => {
  const { author } = ctx.state;
  const page = parseInt(ctx.query.page, 10) || 1;
  const books = await author.getBooks({
    offset: (page - 1) * ctx.state.pageSize,
    limit: ctx.state.pageSize,
  });
  await ctx.render('authors/show', {
    books,
    editAuthorPath: ctx.router.url('authors-edit', author.kebabName),
    destroyAuthorPath: ctx.router.url('authors-destroy', author.kebabName),
    page,
    previousPagePath: ctx.router.url('authors-show', author.kebabName, { query: { page: page - 1 } }),
    nextPagePath: ctx.router.url('authors-show', author.kebabName, { query: { page: page + 1 } }),
  });
});

router.delete('authors-destroy', '/:kebabName', async (ctx) => {
  const { author } = ctx.state;
  await author.destroy();
  ctx.redirect(ctx.state.authorsPath);
});

module.exports = router;
