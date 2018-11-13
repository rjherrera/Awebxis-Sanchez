const KoaRouter = require('koa-router');

const router = new KoaRouter();

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

router.get('instances', '/:username/:book', async (ctx) => {
  const { bookId, userId } = ctx.state;
  const instance = await ctx.orm.BookInstance.findOne({
    where: {
      bookId,
      userId,
    },
  });
  if (instance) {
    ctx.body = { id: instance.id };
  } else {
    ctx.body = { id: -1 };
  }
});

module.exports = router;
