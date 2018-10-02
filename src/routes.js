const KoaRouter = require('koa-router');

const authors = require('./routes/authors');
const books = require('./routes/books');
const genres = require('./routes/genres');
const index = require('./routes/index');
const reviews = require('./routes/reviews');
const users = require('./routes/users');
const session = require('./routes/session');

const router = new KoaRouter();

router.use(async (ctx, next) => {
  Object.assign(ctx.state, {
    authorsPath: ctx.router.url('authors'),
    booksPath: ctx.router.url('books'),
    genresPath: ctx.router.url('genres'),
    usersPath: ctx.router.url('users'),
    currentUser: ctx.session.userId && await ctx.orm.User.findById(ctx.session.userId),
    newSessionPath: ctx.router.url('session-new'),
    destroySessionPath: ctx.router.url('session-destroy'),
    newUserPath: ctx.router.url('users-new'),
    pageSize: 24,
  });
  return next();
});


router.use('/', index.routes());
router.use('/authors', authors.routes());
router.use('/books', books.routes());
router.use('/genres', genres.routes());
router.use('/reviews', reviews.routes());
router.use('/users', users.routes());
router.use('/session', session.routes());

module.exports = router;
