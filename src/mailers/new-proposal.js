const sendNewProposalEmail = (ctx, templateContext) => {
  const { recipient } = templateContext;
  ctx.sendMail(
    'new-proposal',
    { to: recipient.email, subject: 'You got a new proposal!' },
    templateContext,
  );
};

const getInfoAndSendNewProposalEmail = async (ctx, match) => {
  const bookInstanceProposee = await ctx.orm.BookInstance.findByPk(match.proposeeBookInstanceId);
  const bookProposee = await ctx.orm.Book.findByPk(bookInstanceProposee.bookId);
  const recipient = await ctx.orm.User.findByPk(bookInstanceProposee.userId);

  const bookInstanceProposer = await ctx.orm.BookInstance.findByPk(match.proposerBookInstanceId);
  const bookProposer = await ctx.orm.Book.findByPk(bookInstanceProposer.bookId);
  const sender = await ctx.orm.User.findByPk(bookInstanceProposer.userId);

  try {
    sendNewProposalEmail(ctx, {
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
  getInfoAndSendNewProposalEmail,
};
