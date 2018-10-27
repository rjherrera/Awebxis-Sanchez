const sendNewProposalEmail = (ctx, templateContext) => {
  const { recipient } = templateContext;
  ctx.sendMail(
    'new-proposal',
    { to: recipient.email, subject: 'You got a new proposal!' },
    templateContext,
  );
};

const getInfoAndSendNewProposalEmail = async (ctx, match) => {
  const bookInstanceProposee = await ctx.orm.BookInstance.findById(match.proposeeBookInstanceId);
  const bookProposee = await ctx.orm.Book.findById(bookInstanceProposee.bookId);
  const recipient = await ctx.orm.User.findById(bookInstanceProposee.userId);

  const bookInstanceProposer = await ctx.orm.BookInstance.findById(match.proposerBookInstanceId);
  const bookProposer = await ctx.orm.Book.findById(bookInstanceProposer.bookId);
  const sender = await ctx.orm.User.findById(bookInstanceProposer.userId);

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
  sendNewProposalEmail,
  getInfoAndSendNewProposalEmail,
};
