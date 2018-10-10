const KoaRouter = require('koa-router');

const router = new KoaRouter();

router.param('id', async (id, ctx, next) => {
  const match = await ctx.orm.Match.findById(id);
  ctx.assert(match, 404);
  ctx.state.match = match;
  return next();
});

router.post('match-create', '/new', async (ctx) => {
  const match = await ctx.orm.Match.build(ctx.request.body);
  try {
    await match.save({ fields: ['proposerBookInstanceId', 'proposeeBookInstanceId'] });
    ctx.redirect(ctx.router.url('books'));
  } catch (e) {
    ctx.redirect('users');
  }
});


router.patch('match-accept', '/:id', async (ctx) => {
  const { match } = ctx.state;
  try {
    await match.accept();
    ctx.redirect(ctx.router.url('books'));
  } catch (error) {
    ctx.redirect(ctx.router.url('users'));
  }
});

router.delete('match-destroy', '/:id', async (ctx) => {
  const { match } = ctx.state;
  await match.destroy();
  ctx.redirect(ctx.router.url('books'));
});

module.exports = router;
