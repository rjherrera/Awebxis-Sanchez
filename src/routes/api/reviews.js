const KoaRouter = require('koa-router');
const { isValidationError, getFirstErrors } = require('../../lib/models/validation-error');
const { isLoggedIn } = require('../../lib/routes/permissions');

const router = new KoaRouter();

router.param('isbn', async (isbn, ctx, next) => {
  const book = await ctx.orm.Book.findOne({ where: { isbn } });
  ctx.assert(book, 404);
  ctx.state.book = book;
  return next();
});

router.post('reviews-create', '/:isbn', isLoggedIn, async (ctx) => {
  const { book } = ctx.state;
  const review = await ctx.orm.Review.build(
    { ...ctx.request.body, userId: ctx.state.currentUser.id, bookId: book.id },
  );
  try {
    await review.save();
    ctx.body = { book, review };
  } catch (error) {
    if (!isValidationError(error)) throw error;
    ctx.body = { error: getFirstErrors(error) };
  }
});

module.exports = router;
