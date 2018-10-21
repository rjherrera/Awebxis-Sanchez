module.exports = function sendActivationEmail(ctx, templateContext) {
  const { user } = templateContext;
  return ctx.sendMail(
    'activation',
    { to: user.email, subject: 'Welcome to Cambalache!' },
    templateContext,
  );
};
