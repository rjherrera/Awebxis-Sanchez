const KoaRouter = require('koa-router');
const pkg = require('../../package.json');

const router = new KoaRouter();

router.get('/', async (ctx) => {
  if (ctx.state.currentUser) {
    // console.log(ctx.state.currentUser);
    // await ctx.render('books/index');
    await ctx.render('index', { appVersion: pkg.version });
  } else {
    await ctx.render('index', { appVersion: pkg.version });
  }
});

module.exports = router;
