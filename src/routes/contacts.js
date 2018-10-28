const KoaRouter = require('koa-router');
const sendTellAdminEmail = require('../mailers/contact.js');


const router = new KoaRouter();


router.get('contact-get', '/', async (ctx) => {
  await ctx.render('contact/index', { });
});

router.post('contact-post', '/', async (ctx) => {
  const { title } = ctx.request.body;
  const { author } = ctx.request.body;
  const admins = await ctx.orm.User.findAll({
    where: { admin: true },
  });
  try {
    sendTellAdminEmail(ctx, {
      title,
      author,
      admins,
      origin: ctx.request.origin,
    });
  } catch (error) {
    console.log(error);
  }
  ctx.redirect('/');
});


module.exports = router;
