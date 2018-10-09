const KoaRouter = require('koa-router');

const router = new KoaRouter();

router.param('id', async (userId, bookId, ctx, next) => {
  ctx.state.bookId = bookId;
  ctx.state.userId = userId;
  return next();
});


router.post('bookInstance-create', '/', async (ctx) => {
  const instance = await ctx.orm.BookInstance.build(ctx.request.body);
  try {
    await instance.save();
    ctx.redirect(ctx.router.url('books'));
  } catch (e) {
    ctx.redirect(ctx.router.url('books'));
  }
});

router.delete('bookInstances-destroy', '/', async (ctx) => {
  // const { instance } = ctx.state;
  const userId = ctx.state.currentUser.id;
  const bookId = ctx.state.bookId;
  const instance = await ctx.orm.BookInstance.findOne({
    where: {
      userId, bookId,
    },
  });
  if (instance) {
    try {
      await instance.destroy();
    } catch (e) {
      ctx.redirect(ctx.router.url('books'));
    }
  }
  ctx.redirect(ctx.router.url('books'));
});


module.exports = router;
