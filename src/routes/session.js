const KoaRouter = require('koa-router');

const router = new KoaRouter();

router.get('session-new', '/new', async (ctx) => {
  await ctx.render('session/new', {
    createSessionPath: ctx.router.url('session-create'),
    notice: ctx.flashMessage.notice,
  });
});

router.put('session-create', '/', async (ctx) => {
  const { email, password } = ctx.request.body;
  const user = await ctx.orm.User.find({ where: { email } });
  if (user && user.password === password) {
    ctx.session.userId = user.id;
    return ctx.redirect('/');
  }
  return ctx.render('session/new', {
    email,
    createSessionPath: ctx.router.url('session-create'),
    error: 'e-mail o contraseña incorrectos',
  });
});

router.delete('session-destroy', '/', (ctx) => {
  ctx.session = null;
  ctx.redirect(ctx.state.newSessionPath);
});

module.exports = router;
