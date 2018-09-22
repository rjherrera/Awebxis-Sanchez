const KoaRouter = require('koa-router');
const { isValidationError, getFirstErrors } = require('../lib/models/validation-error');

const router = new KoaRouter();

router.param('isbn', async (isbn, ctx, next) => {
  const book = await ctx.orm.Book.findOne({ where: { isbn } });
  ctx.assert(book, 404);
  ctx.state.book = book;
  return next();
});

router.post('reviews-create', '/:isbn', async (ctx) => {
  const { book } = ctx.state;
  const review = await ctx.orm.Review.build(ctx.request.body);
  try {
    await review.save(ctx.request.body);
    await book.addReview(review);
  } catch (error) {
    if (!isValidationError(error)) throw error;
  }
  ctx.redirect(ctx.router.url('books-show', { isbn: book.isbn }));
});

module.exports = router;
