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
    console.log(e.name);
    console.log(e.message);
  }
});

router.delete('interest-destroy', '/:id', async (ctx) => {
  const { interest } = ctx.state;
  console.log(interest);
  await interest.destroy();
  ctx.redirect(ctx.router.url('books'));
});

module.exports = router;
