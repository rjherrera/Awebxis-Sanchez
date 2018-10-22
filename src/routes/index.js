const KoaRouter = require('koa-router');
const pkg = require('../../package.json');

const router = new KoaRouter();

router.get('/', async (ctx) => {
  if (ctx.state.currentUser) {
    // console.log(ctx.state.currentUser);
    // await ctx.render('books/index');
    await ctx.render('index', {
      appVersion: pkg.version,
      newUserPath: ctx.router.url('users-new'),
      newSessionPath: ctx.router.url('session-new'),
    });
  } else {
    await ctx.render('index', {
      appVersion: pkg.version,
      newUserPath: ctx.router.url('users-new'),
      newSessionPath: ctx.router.url('session-new'),
    });
  }
});

module.exports = router;
