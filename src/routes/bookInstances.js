const KoaRouter = require('koa-router');

const router = new KoaRouter();

router.param('bookId', async (bookId, ctx, next) => {
  ctx.state.bookId = bookId;
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

router.delete('bookInstances-destroy', '/:bookId', async (ctx) => {
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
      console.log(e.name);
      console.log(e.message);
      ctx.redirect(ctx.router.url('books'));
    }
  }
  ctx.redirect(ctx.router.url('books'));
});


module.exports = router;
