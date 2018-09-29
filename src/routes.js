const KoaRouter = require('koa-router');

const books = require('./routes/books');
const genres = require('./routes/genres');
const index = require('./routes/index');
const reviews = require('./routes/reviews');
const users = require('./routes/users');
const session = require('./routes/session');

const router = new KoaRouter();

router.use(async (ctx, next) => {
  Object.assign(ctx.state, {
    booksPath: ctx.router.url('books'),
    usersPath: ctx.router.url('users'),
    genresPath: ctx.router.url('genres'),
    currentUser: ctx.session.userId && await ctx.orm.User.findById(ctx.session.userId),
    newSessionPath: ctx.router.url('session-new'),
    destroySessionPath: ctx.router.url('session-destroy'),
    newUserPath: ctx.router.url('users-new'),
  });
  return next();
});


router.use('/', index.routes());
router.use('/books', books.routes());
router.use('/genres', genres.routes());
router.use('/reviews', reviews.routes());
router.use('/users', users.routes());
router.use('/session', session.routes());

module.exports = router;
