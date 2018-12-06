const KoaRouter = require('koa-router');

const router = new KoaRouter();

router.param('username', async (username, ctx, next) => {
  const user = await ctx.orm.User.findOne({ where: { username } });
  ctx.assert(user, 404);
  ctx.state.user = user;
  return next();
});

router.param('id', async (id, ctx, next) => {
  const instance = await ctx.orm.BookInstance.findById(id);
  ctx.assert(instance, 404);
  ctx.state.instance = instance;
  return next();
});

router.get('user-posessions', '/:username/posessions', async (ctx) => {
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

router.post('user-posession-create', '/:username/posessions', async (ctx) => {
  const { bookId, state, comment } = JSON.parse(ctx.request.body);
  const instance = await ctx.orm.BookInstance.build({
    bookId, userId: ctx.state.currentUser.id, state, comment,
  });
  await instance.save({ fields: ['bookId', 'userId', 'state', 'comment'] });
  ctx.body = { instance };
});

router.delete('user-posession-destroy', '/:username/posessions/:id', async (ctx) => {
  const { instance } = ctx.state;
  await instance.destroy();
  ctx.body = { deleted: true };
});

module.exports = router;
