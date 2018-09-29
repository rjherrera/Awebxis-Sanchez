const KoaRouter = require('koa-router');
const _ = require('lodash');

const router = new KoaRouter();

router.param('kebabName', async (kebabName, ctx, next) => {
  const author = await ctx.orm.Author.findOne({
    order: [['name', 'ASC']],
    where: { kebabName },
  });
  ctx.assert(author, 404);
  ctx.state.author = author;
  return next();
});

router.get('authors-show', '/:kebabName', async (ctx) => {
  const { author } = ctx.state;
  const page = parseInt(ctx.query.page, 10) || 1;
  const books = await author.getBooks({
    offset: (page - 1) * 10,
    limit: 10,
  });
  await ctx.render('authors/show', {
    books,
    buildBookPath: book => ctx.router.url('books-show', _.kebabCase(book.isbn)),
    page,
    previousPagePath: ctx.router.url('authors-show', _.kebabCase(author.name), { query: { page: page - 1 } }),
    nextPagePath: ctx.router.url('authors-show', _.kebabCase(author.name), { query: { page: page + 1 } }),
  });
});

module.exports = router;
