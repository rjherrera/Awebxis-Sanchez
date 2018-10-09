const KoaRouter = require('koa-router');

const router = new KoaRouter();

router.post('bookInstance-create', '/', async (ctx) => {
  // const { book } = ctx.state;
  if (ctx.state.currentUser.username !== ctx.request.body.UserId) {
    ctx.redirect(ctx.router.url('books'));
  }
  const instance = await ctx.orm.BookInstance.build(ctx.request.body);
  try {
    await instance.save();
    ctx.redirect(ctx.router.url('books'));
  } catch (e) {
    console.log(e.name);
    console.log(e.message);
  }
});

router.delete('bookInstances-destroy', '/', async (ctx) => {
  // const { instance } = ctx.state;
  const UserId = ctx.request.body.UserId;
  if (ctx.state.currentUser.username !== UserId) {
    ctx.redirect(ctx.router.url('books'));
  }
  const BookId = ctx.request.body.BookId;
  const state = ctx.request.body.state;
  const comment = ctx.request.body.comment;
  const instance = await ctx.orm.BookInstance.findOne({
    where: {
      UserId, BookId, state, comment,
    },
  });
  if (instance) {
    await instance.destroy();
  }
  ctx.redirect(ctx.router.url('books'));
});


module.exports = router;
