const KoaRouter = require('koa-router');
const _ = require('lodash');
const { isAdmin } = require('../../lib/routes/permissions');
const { Author } = require('../../models');

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
    where: { name: { $iLike: `%${q}%` } },
  }, page);
  ctx.body = { genres };
});

router.post('genres-create', '/', isAdmin, async (ctx) => {
  try {
    const genre = await ctx.orm.Genre.create(ctx.request.body);
    ctx.body = { genre };
  } catch (validationError) {
    ctx.body = { errors: validationError.errors };
  }
});

router.patch('genres-update', '/:id', isAdmin, async (ctx) => {
  const { genre } = ctx.state;
  try {
    await genre.update(ctx.request.body);
    ctx.body = { genre };
  } catch (validationError) {
    ctx.body = { errors: validationError.errors };
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
  ctx.body = { genre, books };
});

router.delete('genres-destroy', '/:id', isAdmin, async (ctx) => {
  const { genre } = ctx.state;
  await genre.destroy();
  ctx.body = { deleted: true };
});

module.exports = router;
