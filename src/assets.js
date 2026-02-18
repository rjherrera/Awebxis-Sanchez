let manifest;

try {
  manifest = require('../build/assets/manifest.json');
} catch (error) {
  console.error(error);
}


module.exports = function assetsBuilder(developmentMode) {
  function assetPath(path) {
    return `/assets/${(!developmentMode && manifest && manifest[path]) || path}`;
  }
  return function assets(ctx, next) {
    ctx.state.assetPath = assetPath;
    return next();
  };
};
