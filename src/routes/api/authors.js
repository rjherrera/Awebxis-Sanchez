const KoaRouter = require('koa-router');
const _ = require('lodash');
const { isValidationError, getFirstErrors } = require('../../lib/models/validation-error');
const { isAdmin } = require('../../lib/routes/permissions');
const { Book } = require('../../models');

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
  const authors = await ctx.orm.Author.findAllPaged({
    order: [['name', 'ASC']],
    include: [{ model: Book, as: 'books', limit: 1 }],
    where: { name: { $iLike: `%${q}%` } },
  }, page);
  ctx.body = { authors };
});

router.post('authors-create', '/', isAdmin, async (ctx) => {
  const { name } = ctx.request.body;
  const author = await ctx.orm.Author.build({ name, kebabName: _.kebabCase(name) });
  try {
    await author.save(ctx.request.body);
    ctx.body = { author };
  } catch (error) {
    if (!isValidationError(error)) throw error;
    ctx.body = { errors: getFirstErrors(error) };
  }
});

router.patch('authors-update', '/:kebabName', isAdmin, async (ctx) => {
  const { author } = ctx.state;
  const { name } = ctx.request.body;
  try {
    await author.update({ name, kebabName: _.kebabCase(name) });
    ctx.body = { author };
  } catch (error) {
    if (!isValidationError(error)) throw error;
    ctx.body = { errors: getFirstErrors(error) };
  }
});

router.get('authors-show', '/:kebabName', async (ctx) => {
  const { author } = ctx.state;
  const page = parseInt(ctx.query.page, 10) || 1;
  const books = await author.getBooks({
    offset: (page - 1) * ctx.state.pageSize,
    limit: ctx.state.pageSize,
  });
  ctx.body = { author, books };
});

router.delete('authors-destroy', '/:kebabName', isAdmin, async (ctx) => {
  const { author } = ctx.state;
  await author.destroy();
  ctx.body = { deleted: true };
});

module.exports = router;
