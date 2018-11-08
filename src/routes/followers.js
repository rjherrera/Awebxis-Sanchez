const KoaRouter = require('koa-router');
const { isLoggedIn } = require('../lib/routes/permissions');

const router = new KoaRouter();

router.param('username', async (username, ctx, next) => {
  const user = await ctx.orm.User.findOne({ where: { username } });
  ctx.assert(user, 404);
  ctx.state.user = user;
  return next();
});

router.param('followeeUsername', async (followeeUsername, ctx, next) => {
  const followee = await ctx.orm.User.findOne({ where: { username: followeeUsername } });
  ctx.assert(followee, 404);
  ctx.state.followee = followee;
  return next();
});

router.get('followers', '/:username/followers/', isLoggedIn, async (ctx) => {
  const { user } = ctx.state;
  const followers = await user.getFollowers({
    attributes: {
      exclude: ['password', 'createdAt', 'updatedAt', 'admin', 'active'],
    },
  });
  ctx.body = { followers };
});

router.get('following', '/:username/following/', isLoggedIn, async (ctx) => {
  const { user } = ctx.state;
  const following = await user.getFollowing({
    attributes: {
      exclude: ['password', 'createdAt', 'updatedAt', 'admin', 'active'],
    },
  });
  ctx.body = { following };
});

router.post('follow', '/:username/following/:followeeUsername', isLoggedIn, async (ctx) => {
  const { user, followee } = ctx.state;
  const [follow, created] = await ctx.orm.Follows.findOrCreate({
    where: {
      followerId: user.id,
      followeeId: followee.id,
    },
  });
  ctx.body = { follow, created };
});

router.delete('unfollow', '/:username/following/:followeeUsername', isLoggedIn, async (ctx) => {
  const { user, followee } = ctx.state;
  const follow = await ctx.orm.Follows.findOne({
    where: {
      followerId: user.id,
      followeeId: followee.id,
    },
  });
  ctx.assert(follow, 404);
  await follow.destroy();
  ctx.body = { follow };
});

module.exports = router;
