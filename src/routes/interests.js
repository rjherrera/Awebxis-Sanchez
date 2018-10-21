const KoaRouter = require('koa-router');
const { isAdminOrSelf, isLoggedIn } = require('../lib/routes/permissions');
const { User } = require('../models');

const router = new KoaRouter();

router.use(isLoggedIn);

router.param('id', async (id, ctx, next) => {
  const interest = await ctx.orm.Interest.findById(id, { include: [{ model: User, as: 'user' }] });
  ctx.assert(interest, 404);
  ctx.state.interest = interest;
  ctx.state.user = interest.user;
  return next();
});

router.post('interests-create', '/', async (ctx) => {
  const interest = await ctx.orm.Interest.build(
    { ...ctx.request.body, userId: ctx.state.currentUser.id },
  );
  await interest.save({ fields: ['bookId', 'userId'] });
  ctx.redirect('back');
});

router.delete('interests-destroy', '/:id', isAdminOrSelf, async (ctx) => {
  const { interest } = ctx.state;
  await interest.destroy();
  ctx.redirect('back');
});

module.exports = router;
