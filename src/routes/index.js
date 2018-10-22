const KoaRouter = require('koa-router');
const pkg = require('../../package.json');
const { Author } = require('../models');


const router = new KoaRouter();

router.get('/', async (ctx) => {
  if (ctx.state.currentUser) {
    // console.log(ctx.state.currentUser);
    const page = parseInt(ctx.query.page, 10) || 1;
    const q = ctx.query.q || '';
    const books = await ctx.orm.Book.findAll({
      offset: (page - 1) * ctx.state.pageSize,
      limit: ctx.state.pageSize,
      include: [{ model: Author, as: 'author' }],
      where: { title: { $iLike: `%${q}%` } },
    });
    ctx.redirect(ctx.router.url('books-index', {
      books,
      newBookPath: ctx.router.url('books-new'),
      page,
      q,
      previousPagePath: ctx.router.url('books', { query: { page: page - 1, q } }),
      nextPagePath: ctx.router.url('books', { query: { page: page + 1, q } }),
    }));
  } else {
    await ctx.render('index', {
      appVersion: pkg.version,
      newUserPath: ctx.router.url('users-new'),
      newSessionPath: ctx.router.url('session-new'),
    });
  }
});

module.exports = router;
