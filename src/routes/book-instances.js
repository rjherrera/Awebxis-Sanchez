const KoaRouter = require('koa-router');
const { isLoggedIn } = require('../lib/routes/permissions');

const router = new KoaRouter();

router.use(isLoggedIn);

router.param('bookId', async (bookId, ctx, next) => {
  const instance = await ctx.orm.BookInstance.findOne({
    where: { userId: ctx.state.currentUser.id, bookId },
  });
  ctx.assert(instance, 404);
  ctx.state.instance = instance;
  return next();
});

router.post('book-instances-create', '/', async (ctx) => {
  const instance = await ctx.orm.BookInstance.build(ctx.request.body);
  await instance.save();
  ctx.redirect('back');
});

router.delete('book-instances-destroy', '/:bookId', async (ctx) => {
  const { instance } = ctx.state;
  await instance.destroy();
  ctx.redirect('back');
});


module.exports = router;
