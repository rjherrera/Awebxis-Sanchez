const KoaRouter = require('koa-router');

const router = new KoaRouter();

router.param('id', async (id, ctx, next) => {
  const interest = await ctx.orm.Interest.findById(id);
  ctx.assert(interest, 404);
  ctx.state.interest = interest;
  return next();
});

router.post('interest-create', '/', async (ctx) => {
  // const { book } = ctx.state;
  const interest = await ctx.orm.Interest.build(ctx.request.body);
  try {
    await interest.save();
    ctx.redirect(ctx.router.url('books'));
  } catch (e) {
    ctx.redirect(ctx.router.url('books'));
  }
});

router.delete('interest-destroy', '/:id', async (ctx) => {
  const { interest } = ctx.state;
  await interest.destroy();
  ctx.redirect(ctx.router.url('books'));
});

module.exports = router;
