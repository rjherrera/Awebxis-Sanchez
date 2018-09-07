const KoaRouter = require('koa-router');

const router = new KoaRouter();

router.get('books', '/', async (ctx) => {
  ctx.body = await ctx.orm.Book.findAll();
});

router.get('books-show', '/:isbn', async (ctx) => {
  const book = await ctx.orm.Book.findOne({ where: { isbn: ctx.params.isbn } });
  ctx.assert(book, 404);
  ctx.body = book;
});

router.post('books-create', '/', async (ctx) => {
  await ctx.orm.Book.create(ctx.request.body);
  ctx.redirect(ctx.router.url('books'));
});

router.patch('books-update', '/:isbn', async (ctx) => {
  const book = await ctx.orm.Book.findOne({ where: { isbn: ctx.params.isbn } });
  ctx.assert(book, 404);
  ctx.body = await book.update(
    ctx.request.body,
  );
});

router.delete('books-destroy', '/:isbn', async (ctx) => {
  const book = await ctx.orm.Book.findOne({ where: { isbn: ctx.params.isbn } });
  ctx.assert(book, 404);
  await book.destroy();
  ctx.redirect(ctx.router.url('books'));
});

module.exports = router;
