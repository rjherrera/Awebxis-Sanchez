const KoaRouter = require('koa-router');
const Sequelize = require('sequelize');
const cloudStorage = require('../../lib/cloud-storage');
const { isValidationError, getFirstErrors } = require('../../lib/models/validation-error');
const { isAdmin } = require('../../lib/routes/permissions');
const { Author, Genre } = require('../../models');

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
  ctx.body = { books };
});

router.get('books', '/random', async (ctx) => {
  const book = await ctx.orm.Book.scope('withAuthor').find({
    order: [Sequelize.fn('RANDOM')],
  });
  ctx.body = { book };
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
    ctx.body = { book };
  } catch (error) {
    if (!isValidationError(error)) throw error;
    ctx.body = { errors: getFirstErrors(error) };
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
    ctx.body = { book };
  } catch (error) {
    if (!isValidationError(error)) throw error;
    ctx.body = { errors: getFirstErrors(error) };
  }
});

router.get('books-show', '/:isbn', async (ctx) => {
  const { book } = ctx.state;
  ctx.body = { book };
});

router.delete('books-destroy', '/:isbn', isAdmin, async (ctx) => {
  const { book } = ctx.state;
  await book.destroy();
  ctx.body = { deleted: true };
});


module.exports = router;
