const KoaRouter = require('koa-router');
const { isLoggedIn } = require('../lib/routes/permissions');

const router = new KoaRouter();

router.param('bookId', async (bookId, ctx, next) => {
  ctx.state.bookId = bookId;
  return next();
});

router.post('book-instances-create', '/', isLoggedIn, async (ctx) => {
  const instance = await ctx.orm.BookInstance.build(ctx.request.body);
  try {
    await instance.save();
    ctx.redirect('back');
  } catch (e) {
    ctx.redirect(ctx.router.url('books'));
  }
});

router.delete('book-instances-destroy', '/:bookId', isLoggedIn, async (ctx) => {
  const userId = ctx.state.currentUser.id;
  const { bookId } = ctx.state;
  const instance = await ctx.orm.BookInstance.findOne({
    where: { userId, bookId },
  });
  ctx.assert(instance, 404);
  await instance.destroy();
  ctx.redirect('back');
});


module.exports = router;
