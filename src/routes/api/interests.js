const KoaRouter = require('koa-router');

const router = new KoaRouter();

router.param('username', async (username, ctx, next) => {
  const user = await ctx.orm.User.findOne({ where: { username } });
  ctx.assert(user, 404);
  ctx.state.user = user;
  return next();
});

router.param('id', async (id, ctx, next) => {
  const interest = await ctx.orm.Interest.findById(id);
  ctx.assert(interest, 404);
  ctx.state.interest = interest;
  return next();
});

router.get('user-interests', '/:username/interests', async (ctx) => {
  const { user } = ctx.state;
  const interests = await user.getInterests({ scope: ['withBook'] });
  ctx.body = { interests };
});

router.get('others-interests', '/:username/interests/others', async (ctx) => {
  const { user } = ctx.state;
  const interests = await user.getUserBooks({ scope: ['withBookAndInterestedUsers', 'active'] });
  ctx.body = { interests };
});

router.post('user-interest-create', '/:username/interests', async (ctx) => {
  const { bookId } = JSON.parse(ctx.request.body);
  const interest = await ctx.orm.Interest.build(
    { bookId, userId: ctx.state.currentUser.id },
  );
  await interest.save({ fields: ['bookId', 'userId'] });
  ctx.body = { interest };
});

router.delete('user-interest-destroy', '/:username/interests/:id', async (ctx) => {
  const { interest } = ctx.state;
  await interest.destroy();
  ctx.body = { deleted: true };
});

module.exports = router;
