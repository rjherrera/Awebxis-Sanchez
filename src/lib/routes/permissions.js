function isLogged(ctx, next) {
  ctx.assert(ctx.state.currentUser, 401);
  return next();
}

function isAdmin(ctx, next) {
  ctx.assert(ctx.state.currentUser, 401);
  ctx.assert(ctx.state.currentUser.admin, 403);
  return next();
}

module.exports = {
  isLogged,
  isAdmin,
};
