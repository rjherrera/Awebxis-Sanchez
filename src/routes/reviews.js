const KoaRouter = require('koa-router');
const { isValidationError, getFirstErrors } = require('../lib/models/validation-error');
const { isLogged } = require('../lib/routes/permissions');

const router = new KoaRouter();

router.param('isbn', async (isbn, ctx, next) => {
  const book = await ctx.orm.Book.findOne({ where: { isbn } });
  ctx.assert(book, 404);
  ctx.state.book = book;
  return next();
});

router.post('reviews-create', '/:isbn', isLogged, async (ctx) => {
  const { book } = ctx.state;
  const review = await ctx.orm.Review.build(ctx.request.body);
  try {
    await review.save(ctx.request.body);
    await book.addReview(review);
    ctx.redirect(ctx.router.url('books-show', { isbn: book.isbn }));
  } catch (error) {
    if (!isValidationError(error)) throw error;
    const reviews = await book.getReviews({ limit: 10, order: [['createdAt', 'DESC']] });
    const genres = await book.getGenres({ order: [['name', 'ASC']] });
    await ctx.render('books/show', {
      book,
      genres,
      reviews,
      reviewErrors: getFirstErrors(error),
      editBookPath: ctx.router.url('books-edit', book.isbn),
      destroyBookPath: ctx.router.url('books-destroy', book.isbn),
      submitReviewPath: ctx.router.url('reviews-create', book.isbn),
    });
  }
});

module.exports = router;
