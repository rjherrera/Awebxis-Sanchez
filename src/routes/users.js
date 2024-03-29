const KoaRouter = require('koa-router');
const cloudStorage = require('../lib/cloud-storage');
const { isLoggedIn, isAdmin, isAdminOrSelf } = require('../lib/routes/permissions');
const sendActivationEmail = require('../mailers/activation');

const router = new KoaRouter();

router.param('username', async (username, ctx, next) => {
  const user = await ctx.orm.User.findOne({ where: { username } });
  ctx.assert(user, 404);
  ctx.state.user = user;
  return next();
});

router.get('users', '/', async (ctx) => {
  const page = parseInt(ctx.query.page, 10) || 1;
  const q = ctx.query.q || '';
  const users = await ctx.orm.User.findAllPaged({
    order: [['username', 'ASC']],
    where: { username: { $iLike: `%${q}%` } },
  }, page);
  await ctx.render('users/index', {
    users,
    page,
    isLastPage: users.isLastPage,
    q,
    previousPagePath: ctx.router.url('users', { query: { page: page - 1, q } }),
    nextPagePath: ctx.router.url('users', { query: { page: page + 1, q } }),
  });
});

router.get('users-new', '/new', async (ctx) => {
  const user = ctx.orm.User.build();
  await ctx.render('users/new', {
    user,
    submitUserPath: ctx.router.url('users-create'),
  });
});

router.get('users-edit', '/:username/edit', isAdminOrSelf, async (ctx) => {
  const { user } = ctx.state;
  await ctx.render('users/edit', {
    user,
    submitUserPath: ctx.router.url('users-update', user.username),
  });
});

router.post('users-create', '/', async (ctx) => {
  try {
    const user = await ctx.orm.User.create(ctx.request.body);
    const { files } = ctx.request;
    if (files.profilePicUrl.size) {
      const { path: localImagePath, name: localImageName } = files.profilePicUrl;
      const remoteImagePath = cloudStorage.buildRemotePath(localImageName, { directoryPath: 'users', namePrefix: user.username });
      await cloudStorage.upload(localImagePath, remoteImagePath);
      await user.update({ profilePicUrl: remoteImagePath });
    }
    sendActivationEmail(ctx, {
      user,
      origin: ctx.request.origin,
      activationPath: ctx.router.url('users-activate',
        user.username, { query: { uuid: await user.uuid } }),
    });
    await ctx.render('users/activation-sent', {
      user,
      resendActivationPath: ctx.router.url('users-resend-activation', { username: user.username }),
    });
  } catch (validationError) {
    await ctx.render('users/new', {
      user: ctx.orm.User.create(ctx.request.body),
      errors: validationError.errors,
      submitUserPath: ctx.router.url('users-create'),
    });
  }
});

router.patch('users-update', '/:username', isAdminOrSelf, async (ctx) => {
  const { user } = ctx.state;
  try {
    const params = ctx.request.body;
    if (!params.password) delete params.password;
    await user.update(params, {
      fields: ['username', 'firstName', 'lastName', 'email', 'password'],
    });
    const { files } = ctx.request;
    if (files.profilePicUrl.size) {
      const { path: localImagePath, name: localImageName } = files.profilePicUrl;
      const remoteImagePath = cloudStorage.buildRemotePath(localImageName, { directoryPath: 'users', namePrefix: user.username });
      await cloudStorage.upload(localImagePath, remoteImagePath);
      await user.update({ profilePicUrl: remoteImagePath });
    }
    ctx.redirect(ctx.router.url('users-show', { username: user.username }));
  } catch (validationError) {
    await ctx.render('users/edit', {
      user,
      errors: validationError.errors,
      submitUserPath: ctx.router.url('users-update', user.username),
    });
  }
});

router.get('users-show', '/:username', isLoggedIn, async (ctx) => {
  const { user } = ctx.state;
  const isSelf = ctx.state.currentUser.id === user.id;
  const interests = await user.getInterests({ scope: ['withBook'] });
  const followers = await user.getFollowers();
  const following = await user.getFollowing();
  const feedbacks = await user.getFeedbacks();
  const userBooks = await user.getUserBooks({
    scope: [
      isSelf ? 'withBookAndInterestedUsers' : 'withBook',
      'active',
    ],
  });
  const currentUserBooks = await ctx.state.currentUser.getUserBooks({ scope: ['withBook', 'active'] });
  const pendingMatches = await ctx.orm.Match.scope('withInstances', 'pending').findAll();
  const settledMatches = await ctx.orm.Match.scope('withInstances', 'settled').findAll();

  await ctx.render('users/show', {
    user,
    isSelf,
    isAdminOrSelf: ctx.state.currentUserIsAdmin || isSelf,
    interests,
    followers,
    following,
    feedbacks,
    userBooks,
    currentUserBooks,
    pendingMatches,
    settledMatches,
    editUserPath: ctx.router.url('users-edit', user.username),
    createMatchPath: ctx.router.url('match-create', user.username),
    acceptMatchPath: match => ctx.router.url('match-accept', { id: match.id }),
    destroyMatchPath: match => ctx.router.url('match-destroy', { id: match.id }),
    destroyInterestPath: interest => ctx.router.url('interests-destroy', { id: interest.id }),
    stats: {
      interestsCount: 4, valueInterestsCount: 80, matchesCount: 1, valueMatchesCount: 20,
    },
  });
});

router.get('users-activate', '/:username/activate', async (ctx) => {
  const { user } = ctx.state;
  const targetUuid = await user.uuid;
  if (ctx.query.uuid === targetUuid) {
    user.update({ active: true });
    ctx.redirect(ctx.router.url('session-new'));
  } else {
    await ctx.render('users/activation-failed', {
      resendActivationPath: ctx.router.url('users-resend-activation', { username: user.username }),
    });
  }
});

router.post('users-resend-activation', '/:username/resend-activation', async (ctx) => {
  const { user } = ctx.state;
  sendActivationEmail(ctx, {
    user,
    origin: ctx.request.origin,
    activationPath: ctx.router.url('users-activate',
      user.username, { query: { uuid: await user.uuid } }),
  });
  await ctx.render('users/activation-sent', {
    user,
    resendActivationPath: ctx.router.url('users-resend-activation', { username: user.username }),
  });
});

router.get('users-show-image', '/:username/image', async (ctx) => {
  const { profilePicUrl } = ctx.state.user;
  if (/^https?:\/\//.test(profilePicUrl)) {
    ctx.redirect(profilePicUrl);
  } else {
    ctx.body = cloudStorage.download(profilePicUrl);
  }
});

router.delete('users-destroy', '/:username', isAdmin, async (ctx) => {
  const { user } = ctx.state;
  await user.destroy();
  ctx.redirect(ctx.state.usersPath);
});

module.exports = router;
