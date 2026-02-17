const KoaRouter = require('koa-router');
const newProposal = require('../mailers/new-proposal.js');
const acceptedProposal = require('../mailers/accepted-proposal.js');

const router = new KoaRouter();

router.param('id', async (id, ctx, next) => {
  const match = await ctx.orm.Match.findByPk(id);
  ctx.assert(match, 404);
  ctx.state.match = match;
  return next();
});

router.post('match-create', '/new', async (ctx) => {
  const { proposerBookInstanceId, proposeeBookInstanceId } = JSON.parse(ctx.request.body);
  const match = await ctx.orm.Match.create({ proposerBookInstanceId, proposeeBookInstanceId });
  await newProposal.getInfoAndSendNewProposalEmail(ctx, match);
  ctx.redirect('back');
});

router.patch('match-accept', '/:id', async (ctx) => {
  const { match } = ctx.state;
  await acceptedProposal.getInfoAndSendAcceptedProposalEmail(ctx, match);
  await match.accept();
  ctx.redirect('back');
});

router.delete('match-destroy', '/:id', async (ctx) => {
  const { match } = ctx.state;
  await match.destroy();
  ctx.redirect('back');
});

module.exports = router;
