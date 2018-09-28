const KoaRouter = require('koa-router');
const _ = require('lodash');
const moment = require('moment');
const { isValidationError, getFirstErrors } = require('../lib/models/validation-error');


const router = new KoaRouter();

router.param('isbn', async (isbn, ctx, next) => {
  const book = await ctx.orm.Book.findOne({ where: { isbn } });
  ctx.assert(book, 404);
  ctx.state.book = book;
  return next();
});

router.get('books', '/', async (ctx) => {
  const page = parseInt(ctx.query.page, 10) || 1;
  const books = await ctx.orm.Book.findAll({
    offset: (page - 1) * ctx.state.pageSize,
    limit: ctx.state.pageSize,
  });
  await ctx.render('books/index', {
    books,
    buildBookPath: book => ctx.router.url('books-show', { isbn: book.isbn }),
    newBookPath: ctx.router.url('books-new'),
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
    formatDate: date => moment(date).format('YYYY-MM-DD'),
  });
});

router.get('books-edit', '/:isbn/edit', async (ctx) => {
  const { book } = ctx.state;
  await ctx.render('books/edit', {
    book,
    submitBookPath: ctx.router.url('books-update', book.isbn),
    formatDate: date => moment(date).format('YYYY-MM-DD'),
  });
});

router.post('books-create', '/', async (ctx) => {
  const book = await ctx.orm.Book.build(ctx.request.body);
  try {
    await book.save(ctx.request.body);
    ctx.redirect(ctx.router.url('books-show', { isbn: book.isbn }));
  } catch (error) {
    if (!isValidationError(error)) throw error;
    await ctx.render('books/new', {
      book,
      errors: getFirstErrors(error),
      submitBookPath: ctx.router.url('books-create'),
      formatDate: date => moment(date).format('YYYY-MM-DD'),
    });
  }
});

router.patch('books-update', '/:isbn', async (ctx) => {
  const { book } = ctx.state;
  try {
    await book.update(
      ctx.request.body,
      { fields: ['title', 'author', 'language', 'pages', 'imageUrl', 'publisher', 'datePublished', 'format', 'description'] },
    );
    ctx.redirect(ctx.router.url('books-show', { isbn: book.isbn }));
  } catch (error) {
    if (!isValidationError(error)) throw error;
    await ctx.render('books/edit', {
      book,
      errors: getFirstErrors(error),
      submitBookPath: ctx.router.url('books-update', book.isbn),
      formatDate: date => moment(date).format('YYYY-MM-DD'),
    });
  }
});

router.get('books-show', '/:isbn', async (ctx) => {
  const { book } = ctx.state;
  const reviews = await book.getReviews({ limit: 10, order: [['createdAt', 'DESC']] });
  const genres = await book.getGenres({ order: [['name', 'ASC']] });
  await ctx.render('books/show', {
    book,
    genres,
    reviews,
    editBookPath: ctx.router.url('books-edit', book.isbn),
    destroyBookPath: ctx.router.url('books-destroy', book.isbn),
    buildGenrePath: genre => ctx.router.url('genres-show', _.kebabCase(genre.name)),
    submitReviewPath: ctx.router.url('reviews-create', book.isbn),
    formatDate: (date, format) => moment(date).tz('GMT').format(format),
  });
});

router.delete('books-destroy', '/:isbn', async (ctx) => {
  const { book } = ctx.state;
  await book.destroy();
  ctx.redirect(ctx.router.url('books'));
});

module.exports = router;
