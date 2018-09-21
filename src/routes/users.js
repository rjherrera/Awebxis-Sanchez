const KoaRouter = require('koa-router');

const router = new KoaRouter();

router.param('name', async (name, ctx, next) => {
  ctx.state.user = await ctx.orm.User.findOne({ where: { username: ctx.params.name } });
  ctx.assert(ctx.state.user, 404);
  return next();
});

router.get('users', '/', async (ctx) => {
  const users = await ctx.orm.User.findAll();
  await ctx.render('users/index', {
    users,
    buildUserPath: user => ctx.router.url('users-show', { name: user.username }),
  });
});

router.get('users-new', '/new', async (ctx) => {
  const user = ctx.orm.User.build();
  await ctx.render('users/new', {
    user,
    submitUserPath: ctx.router.url('users-create'),
  });
});

router.get('users-edit', '/:name/edit', async (ctx) => {
  const { user } = ctx.state;
  await ctx.render('users/edit', {
    user,
    submitUserPath: ctx.router.url('users-update', user.username),
  });
});

router.post('users-create', '/', async (ctx) => {
  try {
    const user = await ctx.orm.User.create(ctx.request.body);
    ctx.redirect(ctx.router.url('users-show', { name: user.username }));
  } catch (validationError) {
    await ctx.render('users/new', {
      user: ctx.orm.User.build(ctx.request.body),
      // errors: validationError.errors,
      submitUserPath: ctx.router.url('users-create'),
    });
  }
});

router.patch('users-update', '/:name', async (ctx) => {
  const { user } = ctx.state;
  try {
    await user.update(ctx.request.body);
    ctx.redirect(ctx.router.url('users-show', { name: user.username }));
  } catch (validationError) {
    await ctx.render('names/edit', {
      user,
      errors: validationError.errors,
      submitUserPath: ctx.router.url('users-update', user.username),
    });
  }
});

router.get('users-show', '/:name', async (ctx) => {
  const { user } = ctx.state;
  const interests = await user.getInterests();
  const followers = await user.getFollowers();
  const following = await user.getFollowing();
  const feedbacks = await user.getFeedbacks();
  await ctx.render('users/show', {
    user,
    interests,
    followers,
    following,
    feedbacks,
    editUserPath: ctx.router.url('users-edit', user.username),
  });
});

router.delete('users-destroy', '/:name', async (ctx) => {
  const { user } = ctx.state;
  await user.destroy();
  ctx.redirect(ctx.router.url('users'));
});

module.exports = router;
