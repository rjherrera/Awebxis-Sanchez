const KoaRouter = require('koa-router');
const { isAdminOrSelf, isLoggedIn } = require('../lib/routes/permissions');


const router = new KoaRouter();

router.param('id', isLoggedIn, async (id, ctx, next) => {
  const interest = await ctx.orm.Interest.findById(id);
  ctx.assert(interest, 404);
  ctx.state.interest = interest;
  return next();
});

router.post('interests-create', '/', isLoggedIn, async (ctx) => {
  const interest = await ctx.orm.Interest.build(
    { ...ctx.request.body, userId: ctx.state.currentUser.id },
  );
  await interest.save();
  ctx.redirect('back');
});

router.delete('interests-destroy', '/:id', isAdminOrSelf, async (ctx) => {
  const { interest } = ctx.state;
  await interest.destroy();
  ctx.redirect('back');
});

module.exports = router;
