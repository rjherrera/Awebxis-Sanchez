const KoaRouter = require('koa-router');
const { isLoggedIn, isAdmin } = require('../lib/routes/permissions');
const { Author, Book, BookInstance, User } = require('../models');

const router = new KoaRouter();

function isAdminOrSelf(ctx, next) {
  if (ctx.state.user.id === ctx.state.currentUser.id) {
    return next();
  }
  return isAdmin(ctx, next);
}

router.param('username', async (username, ctx, next) => {
  ctx.state.user = await ctx.orm.User.findOne({ where: { username: ctx.params.username } });
  ctx.assert(ctx.state.user, 404);
  return next();
});

router.get('users', '/', async (ctx) => {
  const users = await ctx.orm.User.findAll();
  await ctx.render('users/index', {
    users,
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
    await ctx.orm.User.create(ctx.request.body);
    ctx.redirect('/users');
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
    ctx.redirect(ctx.router.url('users-show', { username: user.username }));
  } catch (validationError) {
    await ctx.render('names/edit', {
      user,
      errors: validationError.errors,
      submitUserPath: ctx.router.url('users-update', user.username),
    });
  }
});

router.get('users-show', '/:username', isLoggedIn, async (ctx) => {
  const { user } = ctx.state;
  const interests = await user.getInterests({ include: [{ model: Author, as: 'author' }] });
  const followers = await user.getFollowers();
  const following = await user.getFollowing();
  const feedbacks = await user.getFeedbacks();
  const userBooks = await user.getUserBooks({
    include: [{ model: Book, as: 'book' }],
    where: {
      expired: false,
    },
  });

  const currentUserBooks = await ctx.state.currentUser.getUserBooks({
    include: [{ model: Book, as: 'book' }],
    where: {
      expired: false,
    },
  });

  const pendingMatches = await ctx.orm.Match.findAll({
    where: {
      accepted: false,
    },
    include: [{
      model: BookInstance,
      as: 'proposerBookInstance',
      include: [{ model: Book, as: 'book' }, { model: User, as: 'user' }],
    }, {
      model: BookInstance,
      as: 'proposeeBookInstance',
      include: [{ model: Book, as: 'book' }, { model: User, as: 'user' }],
    }],
  });

  const settledMatches = await ctx.orm.Match.findAll({
    where: {
      accepted: true,
    },
    include: [{
      model: BookInstance,
      as: 'proposerBookInstance',
      include: [{ model: Book, as: 'book' }, { model: User, as: 'user' }],
    }, {
      model: BookInstance,
      as: 'proposeeBookInstance',
      include: [{ model: Book, as: 'book' }, { model: User, as: 'user' }],
    }],
  });

  await ctx.render('users/show', {
    user,
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
    destroyInterestPath: interest => ctx.router.url('interest-destroy', { id: interest.id }),
  });
});

router.delete('users-destroy', '/:username', isAdmin, async (ctx) => {
  const { user } = ctx.state;
  await user.destroy();
  ctx.redirect(ctx.state.usersPath);
});

module.exports = router;
