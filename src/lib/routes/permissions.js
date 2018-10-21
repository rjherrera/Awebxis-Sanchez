function isLoggedIn(ctx, next) {
  ctx.assert(ctx.state.currentUser, 401);
  return next();
}

function isAdmin(ctx, next) {
  ctx.assert(ctx.state.currentUser, 401);
  ctx.assert(ctx.state.currentUser.admin, 403);
  return next();
}

function isAdminOrSelf(ctx, next) {
  if (ctx.state.user.id === ctx.state.currentUser.id) {
    return next();
  }
  return isAdmin(ctx, next);
}

module.exports = {
  isLoggedIn,
  isAdmin,
  isAdminOrSelf,
};
