module.exports = function sendTellAdminEmail(ctx, templateContext) {
  const { admins } = templateContext;
  admins.forEach((admin) => {
    ctx.sendMail(
      'contact',
      { to: admin.email, subject: 'Request for new book' },
      templateContext,
    );
  });
};
