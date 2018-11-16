const KoaRouter = require('koa-router');

const router = new KoaRouter();

router.get('auth-new', '/new', async (ctx) => {
  await ctx.render('api/token');
});

module.exports = router;
