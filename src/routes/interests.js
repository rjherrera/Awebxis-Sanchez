const KoaRouter = require('koa-router');

const router = new KoaRouter();

router.param('isbn', async (isbn, ctx, next) => {
  const book = await ctx.orm.Book.findOne({ where: { isbn } });
  ctx.assert(book, 404);
  ctx.state.book = book;
  return next();
});

router.post('interest-create', '/', async (ctx) => {
  // const { book } = ctx.state;
  const interest = await ctx.orm.Interest.build(ctx.request.body);
  try {
    await interest.save();
    ctx.redirect(ctx.router.url('books'));
  } catch (e) {
    console.log(e.name);
    console.log(e.message);
  }
});

module.exports = router;
