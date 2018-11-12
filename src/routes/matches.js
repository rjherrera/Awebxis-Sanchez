const KoaRouter = require('koa-router');
const newProposal = require('../mailers/new-proposal.js');
const acceptedProposal = require('../mailers/accepted-proposal.js');


const router = new KoaRouter();

router.param('id', async (id, ctx, next) => {
  const match = await ctx.orm.Match.findById(id);
  ctx.assert(match, 404);
  ctx.state.match = match;
  return next();
});

router.post('match-create', '/new', async (ctx) => {
  const match = await ctx.orm.Match.build(ctx.request.body);

  await newProposal.getInfoAndSendNewProposalEmail(ctx, match);

  await match.save({ fields: ['proposerBookInstanceId', 'proposeeBookInstanceId'] });
  ctx.redirect('back');
});


router.patch('match-accept', '/:id', async (ctx) => {
  const { match } = ctx.state;

  await acceptedProposal.getInfoAndSendAcceptedProposalEmail(ctx, match);

  await match.accept();
  switch (ctx.accepts(['html', 'json'])) {
    case 'json':
      ctx.body = { match };
      break;
    case 'html':
      ctx.redirect('back');
      break;
    default:
      break;
  }
});

router.delete('match-destroy', '/:id', async (ctx) => {
  const { match } = ctx.state;
  await match.destroy();
  switch (ctx.accepts(['html', 'json'])) {
    case 'json':
      ctx.body = { match };
      break;
    case 'html':
      ctx.redirect('back');
      break;
    default:
      break;
  }
});

module.exports = router;
