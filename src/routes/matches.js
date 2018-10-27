const KoaRouter = require('koa-router');
const sendNewProposalEmail = require('../mailers/new-proposal.js');


const router = new KoaRouter();

router.param('id', async (id, ctx, next) => {
  const match = await ctx.orm.Match.findById(id);
  ctx.assert(match, 404);
  ctx.state.match = match;
  return next();
});

router.post('match-create', '/new', async (ctx) => {
  const match = await ctx.orm.Match.build(ctx.request.body);

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
      origin: ctx.request.origin,
    });
  } catch (error) {
    // Ignore if mail not sent, though it shouldn't fail
  }
  await match.save({ fields: ['proposerBookInstanceId', 'proposeeBookInstanceId'] });
  ctx.redirect('back');
});


router.patch('match-accept', '/:id', async (ctx) => {
  const { match } = ctx.state;

  const bookInstanceProposee = await ctx.orm.BookInstance.findById(match.proposeeBookInstanceId);
  const bookProposee = await ctx.orm.Book.findById(bookInstanceProposee.bookId);
  const recipient = await ctx.orm.User.findById(bookInstanceProposee.userId);

  const bookInstanceProposer = await ctx.orm.BookInstance.findById(ctx.request.body.proposerBookInstanceId);
  const bookProposer = await ctx.orm.Book.findById(bookInstanceProposer.bookId);
  const sender = await ctx.orm.User.findById(bookInstanceProposer.userId);


  await match.accept();
  ctx.redirect('back');
});

router.delete('match-destroy', '/:id', async (ctx) => {
  const { match } = ctx.state;
  await match.destroy();
  ctx.redirect('back');
});

module.exports = router;
