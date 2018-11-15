const KoaRouter = require('koa-router');
const jwt = require('koa-jwt');
const authRoutes = require('./auth');
const interestsRoutes = require('./interests');
const posessionsRoutes = require('./posessions');
const propositionsRoutes = require('./propositions');

const router = new KoaRouter();

// unauthenticated endpoints
router.use('/auth', authRoutes.routes());

// JWT authentication without passthrough (error if not authenticated)
router.use(jwt({ secret: process.env.JWT_SECRET, key: 'authData' }));
router.use(async (ctx, next) => {
  if (ctx.state.authData.userId) {
    ctx.state.currentUser = await ctx.orm.User.findById(ctx.state.authData.userId);
  }
  return next();
});

// authenticated endpoints
router.use('/users', interestsRoutes.routes());
router.use('/users', posessionsRoutes.routes());
router.use('/users', propositionsRoutes.routes());

module.exports = router;
