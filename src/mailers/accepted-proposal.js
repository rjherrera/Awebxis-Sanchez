const sendAcceptedProposalEmail = (ctx, templateContext) => {
  const { sender } = templateContext;
  ctx.sendMail(
    'accepted-proposal',
    { to: sender.email, subject: 'Your proposal got accepted!' },
    templateContext,
  );
};

const getInfoAndSendAcceptedProposalEmail = async (ctx, match) => {
  const bookInstanceProposee = await ctx.orm.BookInstance.findByPk(match.proposeeBookInstanceId);
  const bookProposee = await ctx.orm.Book.findByPk(bookInstanceProposee.bookId);
  const recipient = await ctx.orm.User.findByPk(bookInstanceProposee.userId);

  const bookInstanceProposer = await ctx.orm.BookInstance.findByPk(match.proposerBookInstanceId);
  const bookProposer = await ctx.orm.Book.findByPk(bookInstanceProposer.bookId);
  const sender = await ctx.orm.User.findByPk(bookInstanceProposer.userId);

  try {
    sendAcceptedProposalEmail(ctx, {
      recipient,
      bookProposee,
      sender,
      bookProposer,
      bookInstanceProposer,
      origin: ctx.request.origin,
    });
  } catch (error) {
    // Ignore if mail not sent, though it shouldn't fail
  }
};

module.exports = {
  getInfoAndSendAcceptedProposalEmail,
};
