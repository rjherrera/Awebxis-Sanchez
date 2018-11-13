const KoaRouter = require('koa-router');
const { isLoggedIn } = require('../../lib/routes/permissions');

const router = new KoaRouter();

router.param('username', async (username, ctx, next) => {
  const user = await ctx.orm.User.findOne({ where: { username } });
  ctx.assert(user, 404);
  ctx.state.user = user;
  return next();
});

router.get('proposers', '/:username/proposers/', isLoggedIn, async (ctx) => {
  const { user } = ctx.state;
  const pendingMatches = await ctx.orm.Match.scope('withInstances', 'pending').findAll();
  ctx.body = { proposers: pendingMatches.filter(m => m.proposeeBookInstance.userId === user.id) };
});

router.get('proposing', '/:username/proposing/', isLoggedIn, async (ctx) => {
  const { user } = ctx.state;
  const pendingMatches = await ctx.orm.Match.scope('withInstances', 'pending').findAll();
  ctx.body = { proposing: pendingMatches.filter(m => m.proposerBookInstance.userId === user.id) };
});

module.exports = router;
