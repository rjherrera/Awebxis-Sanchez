const KoaRouter = require('koa-router');

const router = new KoaRouter();

router.get('auth-new', '/new', async (ctx) => {
  if (!ctx.state.currentUser) {
    ctx.redirect(ctx.state.newSessionPath);
  }
  await ctx.render('api/token');
});

module.exports = router;
