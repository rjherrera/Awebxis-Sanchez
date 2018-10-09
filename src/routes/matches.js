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

    // Antes de redirigir poner expired las book instances pasadas y crear las nuevas

    const instance1 = await ctx.orm.BookInstance.findById(match.MatchId1);
    await instance1.update({ expired: true });
    const instance2 = await ctx.orm.BookInstance.findById(match.MatchId2);
    await instance2.update({ expired: true });

    const newInstance1 = await ctx.orm.BookInstance.build({
      UserId: instance2.UserId,
      BookId: instance1.BookId,
      state: instance1.state,
      comment: instance1.comment,
    });
    await newInstance1.save({ fields: ['UserId', 'BookId', 'state', 'comment'] });
    const newInstance2 = await ctx.orm.BookInstance.build({
      UserId: instance1.UserId,
      BookId: instance2.BookId,
      state: instance2.state,
      comment: instance2.comment,
    });
    await newInstance2.save({ fields: ['UserId', 'BookId', 'state', 'comment'] });

    ctx.redirect(ctx.router.url('books'));
  } catch (error) {
    console.log(error.name);
    console.log(error.message);
    ctx.redirect('users');
  }
});


module.exports = router;
