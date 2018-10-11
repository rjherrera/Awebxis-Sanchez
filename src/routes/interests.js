const KoaRouter = require('koa-router');

const router = new KoaRouter();

router.param('id', async (id, ctx, next) => {
  const interest = await ctx.orm.Interest.findById(id);
  ctx.assert(interest, 404);
  ctx.state.interest = interest;
  return next();
});

router.post('interest-create', '/', async (ctx) => {
  const interest = await ctx.orm.Interest.build(ctx.request.body);
  await interest.save();
  ctx.redirect('back');
});

router.delete('interest-destroy', '/:id', async (ctx) => {
  const { interest } = ctx.state;
  await interest.destroy();
  ctx.redirect('back');
});

module.exports = router;
