const KoaRouter = require('koa-router');
const _ = require('lodash');

const utils = require('./lib/utils');

const authors = require('./routes/authors');
const books = require('./routes/books');
const genres = require('./routes/genres');
const index = require('./routes/index');
const reviews = require('./routes/reviews');
const users = require('./routes/users');
const session = require('./routes/session');

const defaults = require('./defaults');

const router = new KoaRouter();

router.use(async (ctx, next) => {
  const currentUser = ctx.session.userId && await ctx.orm.User.findById(ctx.session.userId);
  Object.assign(ctx.state, {
    authorsPath: ctx.router.url('authors'),
    booksPath: ctx.router.url('books'),
    genresPath: ctx.router.url('genres'),
    usersPath: ctx.router.url('users'),
    newUserPath: ctx.router.url('users-new'),
    newSessionPath: ctx.router.url('session-new'),
    destroySessionPath: ctx.router.url('session-destroy'),
    currentUser,
    currentUserIsAdmin: currentUser && currentUser.admin,
    buildAuthorPath: author => ctx.router.url('authors-show', author.kebabName),
    buildBookPath: book => ctx.router.url('books-show', book.isbn),
    getBookImagePath: book => ctx.router.url('books-show-image', book.isbn),
    buildGenrePath: genre => ctx.router.url('genres-show', _.kebabCase(genre.name)),
    buildUserPath: user => ctx.router.url('users-show', user.username),
    pageSize: 24,
    defaults,
    ...utils,
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
