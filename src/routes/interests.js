const KoaRouter = require('koa-router');
const { isAdminOrSelf, isLoggedIn } = require('../lib/routes/permissions');
const { User } = require('../models');

const router = new KoaRouter();

router.use(isLoggedIn);

router.param('id', async (id, ctx, next) => {
  const interest = await ctx.orm.Interest.findById(id, { include: [{ model: User, as: 'user' }] });
  ctx.assert(interest, 404);
  ctx.state.interest = interest;
  ctx.state.user = interest.user;
  return next();
});

router.param('username', async (username, ctx, next) => {
  const user = await ctx.orm.User.findOne({ where: { username } });
  ctx.assert(user, 404);
  ctx.state.userId = user.id;
  return next();
});

router.param('book', async (id, ctx, next) => {
  const book = await ctx.orm.Book.findOne({ where: { id } });
  ctx.assert(book, 404);
  ctx.state.bookId = book.id;
  return next();
});

router.get('interests', '/:username/:book', async (ctx) => {
  const { bookId, userId } = ctx.state;
  const interest = await ctx.orm.Interest.findOne({
    where: {
      bookId,
      userId,
    },
  });
  if (interest) {
    ctx.body = { id: interest.id };
  } else {
    ctx.body = { id: -1 };
  }
});

router.post('interests-create', '/', async (ctx) => {
  const interest = await ctx.orm.Interest.build(
    { ...ctx.request.body, userId: ctx.state.currentUser.id },
  );
  await interest.save({ fields: ['bookId', 'userId'] });
  ctx.redirect('back');
});

router.delete('interests-destroy', '/:id', isAdminOrSelf, async (ctx) => {
  const { interest } = ctx.state;
  await interest.destroy();
  ctx.redirect('back');
});

module.exports = router;
