const KoaRouter = require('koa-router');

const router = new KoaRouter();

router.param('isbn', async (isbn, ctx, next) => {
  const book = await ctx.orm.Book.findOne({ where: { isbn: ctx.params.isbn } });
  ctx.assert(book, 404);
  ctx.state.book = book;
  return next();
});

router.get('books', '/', async (ctx) => {
  const page = parseInt(ctx.query.page, 10) || 1;
  const books = await ctx.orm.Book.findAll({ offset: (page - 1) * 10, limit: 10 });
  await ctx.render('books/index', {
    books,
    buildBookPath: book => ctx.router.url('books-show', { isbn: book.isbn }),
    page,
    previousPagePath: ctx.router.url('books', { query: { page: page - 1 } }),
    nextPagePath: ctx.router.url('books', { query: { page: page + 1 } }),
  });
});

router.get('books-new', '/new', async (ctx) => {
  const book = ctx.orm.Book.build();
  await ctx.render('books/new', {
    book,
    submitBookPath: ctx.router.url('books-create'),
  });
});

router.get('books-edit', '/:isbn/edit', async (ctx) => {
  const { book } = ctx.state;
  await ctx.render('books/edit', {
    book,
    submitBookPath: ctx.router.url('books-update', book.isbn),
  });
});

router.post('books-create', '/', async (ctx) => {
  try {
    const book = await ctx.orm.Book.create(ctx.request.body);
    ctx.redirect(ctx.router.url('books-show', { isbn: book.isbn }));
  } catch (validationError) {
    await ctx.render('books/new', {
      book: ctx.orm.Book.build(ctx.request.body),
      errors: validationError.errors,
      submitBookPath: ctx.router.url('books-create'),
    });
  }
});

router.patch('books-update', '/:isbn', async (ctx) => {
  const { book } = ctx.state;
  try {
    await book.update(ctx.request.body);
    ctx.redirect(ctx.router.url('books-show', { isbn: book.isbn }));
  } catch (validationError) {
    await ctx.render('books/edit', {
      book,
      errors: validationError.errors,
      submitBookPath: ctx.router.url('books-update', book.isbn),
    });
  }
});

router.get('books-show', '/:isbn', async (ctx) => {
  const { book } = ctx.state;
  const reviews = await book.getReviews({ limit: 10, order: [['createdAt', 'DESC']] });
  await ctx.render('books/show', {
    book,
    reviews,
    editBookPath: ctx.router.url('books-edit', book.isbn),
  });
});

router.delete('books-destroy', '/:isbn', async (ctx) => {
  const { book } = ctx.state;
  await book.destroy();
  ctx.redirect(ctx.router.url('books'));
});

module.exports = router;
