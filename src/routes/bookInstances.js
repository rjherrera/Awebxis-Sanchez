const KoaRouter = require('koa-router');

const router = new KoaRouter();

router.param('isbn', async (isbn, ctx, next) => {
  const book = await ctx.orm.Book.findOne({ where: { isbn } });
  ctx.assert(book, 404);
  ctx.state.book = book;
  return next();
});

router.post('bookInstance-create', '/', async (ctx) => {
  // const { book } = ctx.state;
  const instance = await ctx.orm.BookInstance.build(ctx.request.body);
  try {
    await instance.save();
    ctx.redirect(ctx.router.url('books'));
  } catch (e) {
    console.log(e.name);
    console.log(e.message);
  }
});

module.exports = router;
