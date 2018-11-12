const KoaRouter = require('koa-router');

const router = new KoaRouter();

router.param('username', async (username, ctx, next) => {
  const user = await ctx.orm.User.findOne({ where: { username } });
  ctx.assert(user, 404);
  ctx.state.user = user;
  return next();
});

router.get('own-interests', '/:username/interests/own', async (ctx) => {
  const { user } = ctx.state;
  const interests = await user.getInterests({ scope: ['withBook'] });
  ctx.body = { interests };
});

router.get('others-interests', '/:username/interests/others', async (ctx) => {
  const { user } = ctx.state;
  const interests = await user.getUserBooks({ scope: ['withBookAndInterestedUsers', 'active'] });
  ctx.body = { interests };
});


module.exports = router;
