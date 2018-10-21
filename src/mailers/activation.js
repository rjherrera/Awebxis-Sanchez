module.exports = function sendActivationEmail(ctx, { user }) {
  return ctx.sendMail('activation', { to: user.email, subject: 'Welcome to Cambalache!' }, { user });
};
