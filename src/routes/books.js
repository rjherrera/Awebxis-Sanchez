const KoaRouter = require('koa-router');
const cloudStorage = require('../lib/cloud-storage');
const { isValidationError, getFirstErrors } = require('../lib/models/validation-error');
const { isAdmin } = require('../lib/routes/permissions');
const { Author, Genre, User } = require('../models');
const { fetchAvgRating } = require('../lib/utils/fetch-avg-rating.js');

const router = new KoaRouter();

router.param('isbn', async (isbn, ctx, next) => {
  const book = await ctx.orm.Book.findOne({
    where: { isbn },
    include: [
      { model: Author, as: 'author' },
      { model: Genre, as: 'genres' },
    ],
  });
  ctx.assert(book, 404);
  ctx.state.book = book;
  return next();
});

router.get('books', '/', async (ctx) => {
  const page = parseInt(ctx.query.page, 10) || 1;
  const q = ctx.query.q || '';
  const books = await ctx.orm.Book.findAllPaged({
    include: [{ model: Author, as: 'author' }],
    where: { title: { $iLike: `%${q}%` } },
  }, page);
  await ctx.render('books/index', {
    books,
    newBookPath: ctx.router.url('books-new'),
    page,
    isLastPage: books.isLastPage,
    q,
    previousPagePath: ctx.router.url('books', { query: { page: page - 1, q } }),
    nextPagePath: ctx.router.url('books', { query: { page: page + 1, q } }),
  });
});

router.get('books-new', '/new', isAdmin, async (ctx) => {
  const book = ctx.orm.Book.build();
  const genres = await ctx.orm.Genre.findAll({ order: [['name', 'ASC']] });
  await ctx.render('books/new', {
    book,
    genres,
    submitBookPath: ctx.router.url('books-create'),
  });
});

router.get('books-edit', '/:isbn/edit', isAdmin, async (ctx) => {
  const { book } = ctx.state;
  const genres = await ctx.orm.Genre.findAll({ order: [['name', 'ASC']] });
  await ctx.render('books/edit', {
    book,
    genres,
    submitBookPath: ctx.router.url('books-update', book.isbn),
  });
});

router.post('books-create', '/', isAdmin, async (ctx) => {
  const book = await ctx.orm.Book.build(ctx.request.body);
  const author = await ctx.orm.Author.findOne({ where: { name: ctx.request.body.author } });
  const genresIds = ctx.request.body.genres || [];
  try {
    await book.setAuthor(author, { save: false });
    await book.save(
      { fields: ['title', 'isbn', 'language', 'pages', 'publisher', 'datePublished', 'format', 'description', 'authorId'] },
    );
    const { files } = ctx.request;
    if (files.imageUrl.size) {
      const { path: localImagePath, name: localImageName } = files.imageUrl;
      const remoteImagePath = cloudStorage.buildRemotePath(localImageName, { directoryPath: 'books', namePrefix: book.isbn });
      await cloudStorage.upload(localImagePath, remoteImagePath);
      await book.update({ imageUrl: remoteImagePath });
    }
    await book.setGenres(genresIds);
    ctx.redirect(ctx.router.url('books-show', { isbn: book.isbn }));
  } catch (error) {
    if (!isValidationError(error)) throw error;
    const genres = await ctx.orm.Genre.findAll({ order: [['name', 'ASC']] });
    await ctx.render('books/new', {
      book,
      genres,
      errors: getFirstErrors(error),
      submitBookPath: ctx.router.url('books-create'),
    });
  }
});

router.patch('books-update', '/:isbn', isAdmin, async (ctx) => {
  const { book } = ctx.state;
  const author = await ctx.orm.Author.findOne({ where: { name: ctx.request.body.author } });
  const genresIds = ctx.request.body.genres || [];
  try {
    await book.setAuthor(author);
    await book.setGenres(genresIds);
    await book.update(
      ctx.request.body,
      { fields: ['title', 'language', 'pages', 'publisher', 'datePublished', 'format', 'description'] },
    );
    const { files } = ctx.request;
    if (files.imageUrl.size) {
      const { path: localImagePath, name: localImageName } = files.imageUrl;
      const remoteImagePath = cloudStorage.buildRemotePath(localImageName, { directoryPath: 'books', namePrefix: book.isbn });
      await cloudStorage.upload(localImagePath, remoteImagePath);
      await book.update({ imageUrl: remoteImagePath });
    }
    ctx.redirect(ctx.router.url('books-show', { isbn: book.isbn }));
  } catch (error) {
    if (!isValidationError(error)) throw error;
    const genres = await ctx.orm.Genre.findAll({ order: [['name', 'ASC']] });
    await ctx.render('books/edit', {
      book,
      genres,
      errors: getFirstErrors(error),
      submitBookPath: ctx.router.url('books-update', book.isbn),
    });
  }
});

router.get('books-show', '/:isbn', async (ctx) => {
  const { book } = ctx.state;
  const reviews = await book.getReviews({
    order: [['createdAt', 'DESC']],
    include: [{ model: User, as: 'user' }],
  });

  const bookInstance = ctx.state.currentUser ? await ctx.orm.BookInstance.findOne({
    where: {
      bookId: book.id,
      userId: ctx.state.currentUser.id,
    },
  }) : null;

  const interest = ctx.state.currentUser ? await ctx.orm.Interest.findOne({
    where: {
      bookId: book.id,
      userId: ctx.state.currentUser.id,
    },
  }) : null;

  const avgRating = await fetchAvgRating(book);

  const books = await ctx.orm.Book.scope('withInterestedUsers', 'withInstances').findAll();
  const loadedBook = books.find(bk => bk.id === book.id);

  const interestsCount = loadedBook.interests.length;
  const interestsMaxCount = Math.max(...books.map(bk => bk.interests.length)) || 1;
  const valueInterestsCount = parseInt(interestsCount / interestsMaxCount * 100, 10);

  const instances = books.map(bk => bk.instances).reduce((acc, val) => acc.concat(val), []);
  const countMatches = i => i.proposerMatches.length + i.proposeeMatches.length;
  const matchesCount = loadedBook.instances.map(countMatches).reduce((acc, val) => acc + val, 0);
  const matchesMaxCount = Math.max(...instances.map(countMatches)) || 1;
  const valueMatchesCount = parseInt(matchesCount / matchesMaxCount * 100, 10);

  await ctx.render('books/show', {
    reviews,
    bookInstance,
    interest,
    avgRating,
    stats: { interestsCount, valueInterestsCount, matchesCount, valueMatchesCount },
    editBookPath: ctx.router.url('books-edit', book.isbn),
    destroyBookPath: ctx.router.url('books-destroy', book.isbn),
    authorPath: ctx.router.url('authors-show', book.author.kebabName),
    submitReviewPath: ctx.router.url('reviews-create', book.isbn),
    newBookInstancePath: ctx.router.url('book-instances-create'),
    destroyBookInstancePath: instance => ctx.router.url('book-instances-destroy', instance.id),
    newInterestPath: ctx.router.url('interests-create', book.isbn),
    destroyInterestPath: intrst => ctx.router.url('interests-destroy', intrst.id),
  });
});

router.get('books-show-image', '/:isbn/image', async (ctx) => {
  const { imageUrl } = ctx.state.book;
  if (/^https?:\/\//.test(imageUrl)) {
    ctx.redirect(imageUrl);
  } else {
    ctx.body = cloudStorage.download(imageUrl);
  }
});

router.delete('books-destroy', '/:isbn', isAdmin, async (ctx) => {
  const { book } = ctx.state;
  await book.destroy();
  ctx.redirect(ctx.router.url('books'));
});

module.exports = router;
