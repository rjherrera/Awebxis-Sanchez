const KoaRouter = require('koa-router');

const books = require('./routes/books');
const hello = require('./routes/hello');
const index = require('./routes/index');

const router = new KoaRouter();

router.use(async (ctx, next) => {
  Object.assign(ctx.state, {
    booksPath: ctx.router.url('books'),
  });
  return next();
});

router.use('/', index.routes());
router.use('/books', books.routes());
router.use('/hello', hello.routes());

module.exports = router;
