const KoaRouter = require('koa-router');

const router = new KoaRouter();

router.param('username', async (username, ctx, next) => {
  const user = await ctx.orm.User.findOne({ where: { username } });
  ctx.assert(user, 404);
  ctx.state.user = user;
  return next();
});

router.get('posessions', '/:username/posessions/', async (ctx) => {
  const { user } = ctx.state;
  const isSelf = ctx.state.currentUser.id === user.id;
  const posessions = await user.getUserBooks({
    scope: [
      isSelf ? 'withBookAndInterestedUsers' : 'withBook',
      'active',
    ],
  });
  ctx.body = { posessions };
});

module.exports = router;
