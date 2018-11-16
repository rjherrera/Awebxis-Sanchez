const KoaRouter = require('koa-router');

const router = new KoaRouter();

router.param('id', async (id, ctx, next) => {
  const match = await ctx.orm.Match.findById(id);
  ctx.assert(match, 404);
  ctx.state.match = match;
  return next();
});

router.post('match-create', '/new', async (ctx) => {
  const { proposerBookInstanceId, proposeeBookInstanceId } = JSON.parse(ctx.request.body);
  const match = await ctx.orm.Match.create({ proposerBookInstanceId, proposeeBookInstanceId });
  const matchWithBooks = await ctx.orm.Match.scope('withInstances').findById(match.id);
  ctx.body = { match: matchWithBooks };
});


router.patch('match-accept', '/:id', async (ctx) => {
  const { match } = ctx.state;
  await match.accept();
  ctx.body = { match };
});

router.delete('match-destroy', '/:id', async (ctx) => {
  const { match } = ctx.state;
  await match.destroy();
  ctx.body = { match };
});

module.exports = router;
