const KoaRouter = require('koa-router');

const books = require('./routes/books');
const genres = require('./routes/genres');
const hello = require('./routes/hello');
const index = require('./routes/index');
const reviews = require('./routes/reviews');
const users = require('./routes/users');

const router = new KoaRouter();

router.use(async (ctx, next) => {
  Object.assign(ctx.state, {
    booksPath: ctx.router.url('books'),
  });
  Object.assign(ctx.state, {
    usersPath: ctx.router.url('users'),
  });
  return next();
});

router.use('/', index.routes());
router.use('/books', books.routes());
router.use('/genres', genres.routes());
router.use('/hello', hello.routes());
router.use('/reviews', reviews.routes());
router.use('/users', users.routes());

module.exports = router;
