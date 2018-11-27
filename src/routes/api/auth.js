const KoaRouter = require('koa-router');
const jwtgenerator = require('jsonwebtoken');

const router = new KoaRouter();

const generateToken = async (user) => {
  const token = await new Promise((resolve, reject) => {
    jwtgenerator.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      (err, tokenResult) => (err ? reject(err) : resolve(tokenResult)),
    );
  });
  return token;
};

router.post('auth-create', '/', async (ctx) => {
  let user;
  const { email, password } = ctx.request.body;
  if (email && password) {
    user = await ctx.orm.User.find({ where: { email } });
  } else if (ctx.session.userId) {
    user = await ctx.orm.User.findById(ctx.session.userId);
  } else {
    ctx.throw(401);
  }
  if (user) {
    if (password) ctx.assert(await user.checkPassword(password), 401);
    const token = await generateToken(user);
    ctx.body = { token };
  } else {
    ctx.throw(401);
  }
});

module.exports = router;
