const KoaRouter = require('koa-router');
const cloudStorage = require('../lib/cloud-storage');
const { isValidationError, getFirstErrors } = require('../lib/models/validation-error');
const { isAdmin } = require('../lib/routes/permissions');
const { Author, User } = require('../models');

const router = new KoaRouter();

router.param('isbn', async (isbn, ctx, next) => {
  const book = await ctx.orm.Book.findOne({
    where: { isbn },
    include: [{ model: Author, as: 'author' }],
  });
  ctx.assert(book, 404);
  ctx.state.book = book;
  return next();
});

router.get('books', '/', async (ctx) => {
  const page = parseInt(ctx.query.page, 10) || 1;
  const q = ctx.query.q || '';
  const books = await ctx.orm.Book.findAll({
    offset: (page - 1) * ctx.state.pageSize,
    limit: ctx.state.pageSize,
    include: [{ model: Author, as: 'author' }],
    where: { title: { $iLike: `%${q}%` } },
  });
  await ctx.render('books/index', {
    books,
    newBookPath: ctx.router.url('books-new'),
    page,
    q,
    previousPagePath: ctx.router.url('books', { query: { page: page - 1, q } }),
    nextPagePath: ctx.router.url('books', { query: { page: page + 1, q } }),
  });
});

router.get('books-new', '/new', isAdmin, async (ctx) => {
  const book = ctx.orm.Book.build();
  await ctx.render('books/new', {
    book,
    submitBookPath: ctx.router.url('books-create'),
  });
});

router.get('books-edit', '/:isbn/edit', isAdmin, async (ctx) => {
  const { book } = ctx.state;
  await ctx.render('books/edit', {
    book,
    submitBookPath: ctx.router.url('books-update', book.isbn),
  });
});

router.post('books-create', '/', isAdmin, async (ctx) => {
  const book = await ctx.orm.Book.build(ctx.request.body);
  const author = await ctx.orm.Author.findOne({ where: { name: ctx.request.body.author } });
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
    ctx.redirect(ctx.router.url('books-show', { isbn: book.isbn }));
  } catch (error) {
    if (!isValidationError(error)) throw error;
    await ctx.render('books/new', {
      book,
      errors: getFirstErrors(error),
      submitBookPath: ctx.router.url('books-create'),
    });
  }
});

router.patch('books-update', '/:isbn', isAdmin, async (ctx) => {
  const { book } = ctx.state;
  const author = await ctx.orm.Author.findOne({ where: { name: ctx.request.body.author } });
  try {
    await book.setAuthor(author);
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
    await ctx.render('books/edit', {
      book,
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
  const genres = await book.getGenres({ order: [['name', 'ASC']] });
  await ctx.render('books/show', {
    genres,
    reviews,
    editBookPath: ctx.router.url('books-edit', book.isbn),
    destroyBookPath: ctx.router.url('books-destroy', book.isbn),
    authorPath: ctx.router.url('authors-show', book.author.kebabName),
    submitReviewPath: ctx.router.url('reviews-create', book.isbn),
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
