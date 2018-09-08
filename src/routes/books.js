const KoaRouter = require('koa-router');

const router = new KoaRouter();

const loadBook = async (ctx, next) => {
  ctx.state.book = await ctx.orm.Book.findOne({ where: { isbn: ctx.params.isbn } });
  return next();
};

router.get('books', '/', async (ctx) => {
  const page = ctx.query.page || 1;
  ctx.body = await ctx.orm.Book.findAll({ offset: (page - 1) * 10, limit: 10 });
});

router.get('books-show', '/:isbn', loadBook, async (ctx) => {
  const { book } = ctx.state;
  ctx.assert(book, 404);
  ctx.body = book;
});

router.post('books-create', '/', async (ctx) => {
  await ctx.orm.Book.create(ctx.request.body);
  ctx.redirect(ctx.router.url('books'));
});

router.patch('books-update', '/:isbn', async (ctx) => {
  const { book } = ctx.state;
  ctx.assert(book, 404);
  ctx.body = await book.update(
    ctx.request.body,
  );
});

router.delete('books-destroy', '/:isbn', async (ctx) => {
  const { book } = ctx.state;
  ctx.assert(book, 404);
  await book.destroy();
  ctx.redirect(ctx.router.url('books'));
});

module.exports = router;
