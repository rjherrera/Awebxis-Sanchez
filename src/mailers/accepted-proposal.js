module.exports = function sendAcceptedProposalEmail(ctx, templateContext) {
  const { sender } = templateContext;
  ctx.sendMail(
    'accepted-proposal',
    { to: sender.email, subject: 'Your proposal got accepted!' },
    templateContext,
  );
};
