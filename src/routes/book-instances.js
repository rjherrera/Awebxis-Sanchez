const KoaRouter = require('koa-router');
const { isAdminOrSelf, isLoggedIn } = require('../lib/routes/permissions');
const { User } = require('../models');

const router = new KoaRouter();

router.use(isLoggedIn);

router.param('id', async (id, ctx, next) => {
  const instance = await ctx.orm.BookInstance.findById(id, { include: [{ model: User, as: 'user' }] });
  ctx.assert(instance, 404);
  ctx.state.instance = instance;
  ctx.state.user = instance.user;
  return next();
});

router.post('book-instances-create', '/', async (ctx) => {
  const instance = await ctx.orm.BookInstance.build(
    { ...ctx.request.body, userId: ctx.state.currentUser.id },
  );
  await instance.save();
  console.log(`instance is ${instance}`);
  // ctx.append('id', `${instance.id}`);
  ctx.redirect('back');
});

router.delete('book-instances-destroy', '/:id', isAdminOrSelf, async (ctx) => {
  const { instance } = ctx.state;
  await instance.destroy();
  // const book = await ctx.orm.Book.findById(instance.bookId);
  // console.log(`book.isbn es ${book.isbn}`);
  // ctx.redirect(ctx.router.url('books-show', { isbn: book.isbn }));
  ctx.redirect('back');
});


module.exports = router;
