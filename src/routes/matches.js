const KoaRouter = require('koa-router');

const router = new KoaRouter();

router.post('match-create', '/new', async (ctx) => {
  const match = await ctx.orm.Match.build(ctx.request.body);
  try {
    await match.save({ fields: ['MatchId1', 'MatchId2'] });
    ctx.redirect(ctx.router.url('books'));
  } catch (e) {
    console.log(e.name);
    console.log(e.message);
    ctx.redirect('users');
  }
});


router.patch('match-accept', '/', async (ctx) => {
//   const { match } = ctx.state;
  const match = await ctx.orm.Match.findById(ctx.request.body.id);
  try {
    await match.update({ accepted: true });
    ctx.redirect(ctx.router.url('books'));
  } catch (error) {
    console.log(error.name);
    console.log(error.message);
    ctx.redirect('users');
  }
});


module.exports = router;
