const KoaRouter = require('koa-router');
const sendTellAdminEmail = require('../mailers/tell-admin.js');


const router = new KoaRouter();


router.get('tell-admin-get', '/', async (ctx) => {
  await ctx.render('tellAdmins/index', { });
});

router.post('tell-admin-post', '/', async (ctx) => {
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
});


module.exports = router;
