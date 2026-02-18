module.exports = function babelConfig(api) {
  const babelEnv = api.env();

  return {
    presets: [
      ['@babel/preset-env', {
        modules: false,
        useBuiltIns: 'usage',
        corejs: 3,
      }],
      ['@babel/preset-react', {
        development: babelEnv === 'development',
      }],
    ],
    plugins: [],
  };
};
