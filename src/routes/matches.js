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
    await match.save({ fields: ['matchId1', 'matchId2'] });
    ctx.redirect(ctx.router.url('books'));
  } catch (e) {
    ctx.redirect('users');
  }
});


router.patch('match-accept', '/', async (ctx) => {
//   const { match } = ctx.state;
  const match = await ctx.orm.Match.findById(ctx.request.body.id);
  //   console.log(ctx.state);
  try {
    await match.update({ accepted: true });

    // Antes de redirigir poner expired las book instances pasadas y crear las nuevas
    const instance1 = await ctx.orm.BookInstance.findById(match.matchId1);
    await instance1.update({ expired: true });
    const instance2 = await ctx.orm.BookInstance.findById(match.matchId2);
    await instance2.update({ expired: true });

    const newInstance1 = await ctx.orm.BookInstance.build({
      userId: instance2.userId,
      bookId: instance1.bookId,
      state: instance1.state,
      comment: instance1.comment,
    });
    await newInstance1.save({ fields: ['userId', 'bookId', 'state', 'comment'] });
    const newInstance2 = await ctx.orm.BookInstance.build({
      userId: instance1.userId,
      bookId: instance2.bookId,
      state: instance2.state,
      comment: instance2.comment,
    });
    await newInstance2.save({ fields: ['userId', 'bookId', 'state', 'comment'] });

    ctx.redirect(ctx.router.url('books'));
  } catch (error) {
    console.log(error.name);
    console.log(error.message);
    ctx.redirect(ctx.router.url('users'));
  }
});

router.delete('match-destroy', '/:id', async (ctx) => {
  const { match } = ctx.state;
  await match.destroy();
  ctx.redirect(ctx.router.url('books'));
});

module.exports = router;
