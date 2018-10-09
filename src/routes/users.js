const KoaRouter = require('koa-router');
const { Author } = require('../models');
const { Book } = require('../models');
const { BookInstance } = require('../models');

const router = new KoaRouter();

router.param('username', async (username, ctx, next) => {
  ctx.state.user = await ctx.orm.User.findOne({ where: { username: ctx.params.username } });
  ctx.assert(ctx.state.user, 404);
  return next();
});

router.get('users', '/', async (ctx) => {
  const users = await ctx.orm.User.findAll();
  await ctx.render('users/index', {
    users,
    buildUserPath: user => ctx.router.url('users-show', { username: user.username }),
  });
});

router.get('users-new', '/new', async (ctx) => {
  const user = ctx.orm.User.build();
  await ctx.render('users/new', {
    user,
    submitUserPath: ctx.router.url('users-create'),
  });
});

router.get('users-edit', '/:username/edit', async (ctx) => {
  const { user } = ctx.state;
  await ctx.render('users/edit', {
    user,
    submitUserPath: ctx.router.url('users-update', user.username),
  });
});

router.post('users-create', '/', async (ctx) => {
  try {
    const user = await ctx.orm.User.create(ctx.request.body);
    ctx.redirect(ctx.router.url('users-show', { username: user.username }));
  } catch (validationError) {
    await ctx.render('users/new', {
      user: ctx.orm.User.create(ctx.request.body),
      errors: validationError.errors,
      submitUserPath: ctx.router.url('users-create'),
    });
  }
});

router.patch('users-update', '/:username', async (ctx) => {
  const { user } = ctx.state;
  try {
    await user.update(ctx.request.body);
    ctx.redirect(ctx.router.url('users-show', { username: user.username }));
  } catch (validationError) {
    await ctx.render('names/edit', {
      user,
      errors: validationError.errors,
      submitUserPath: ctx.router.url('users-update', user.username),
    });
  }
});

router.get('users-show', '/:username', async (ctx) => {
  const { user } = ctx.state;
  const interests = await user.getInterests({ include: [{ model: Author, as: 'author' }] });
  const followers = await user.getFollowers();
  const following = await user.getFollowing();
  const feedbacks = await user.getFeedbacks();
  const userBooks = await user.getUserBooks({ include: [{ model: Book, as: 'book' }] });
  const currentUserBooks = await ctx.state.currentUser.getUserBooks({ include: [{ model: Book, as: 'book' }] });
  const pendingMatches = await ctx.orm.Match.findAll({
    include: [{ model: BookInstance, as: 'instance1' },
      { model: BookInstance, as: 'instance2' }],
    where: {
      accepted: false,
    },
  });

  let bookTitles = [];
  for (let i = 0; i < pendingMatches.length; i += 1) {
    let aux = [ctx.orm.Book.findById(pendingMatches[i].instance1.BookId),
      ctx.orm.Book.findById(pendingMatches[i].instance2.BookId)];
    aux = Promise.all(aux);
    bookTitles.push(aux);
  }
  bookTitles = await Promise.all(bookTitles);

  let userNames = [];
  for (let i = 0; i < pendingMatches.length; i += 1) {
    userNames.push(ctx.orm.User.findById(pendingMatches[i].instance1.UserId));
  }
  userNames = await Promise.all(userNames);


  await ctx.render('users/show', {
    user,
    interests,
    followers,
    following,
    feedbacks,
    userBooks,
    currentUserBooks,
    pendingMatches,
    bookTitles,
    userNames,
    editUserPath: ctx.router.url('users-edit', user.username),
    createMatchPath: ctx.router.url('match-create', user.username),
    acceptMatchPath: ctx.router.url('match-accept', user.username),
  });
});

router.delete('users-destroy', '/:username', async (ctx) => {
  const { user } = ctx.state;
  await user.destroy();
  ctx.redirect(ctx.router.url('users'));
});

module.exports = router;
