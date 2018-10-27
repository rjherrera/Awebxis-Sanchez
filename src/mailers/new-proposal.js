module.exports = function sendNewProposalEmail(ctx, templateContext) {
  const { recipient } = templateContext;
  ctx.sendMail(
    'new-proposal',
    { to: recipient.email, subject: 'You got a new proposal!' },
    templateContext,
  );
};
