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

router.delete('bookInstances-destroy', '/', async (ctx) => {
  // const { instance } = ctx.state;
  const UserId = ctx.request.body.UserId;
  const BookId = ctx.request.body.BookId;
  const state = ctx.request.body.state;
  const comment = ctx.request.body.comment;
  const instance = await ctx.orm.BookInstance.findOne({
    where: {
      UserId, BookId, state, comment,
    },
  });
  await instance.destroy();
  ctx.redirect(ctx.router.url('books'));
});


module.exports = router;
