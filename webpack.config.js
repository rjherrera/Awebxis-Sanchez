const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');

const developmentMode = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

module.exports = {
  mode: developmentMode ? 'development' : 'production',
  context: path.join(__dirname, 'src', 'assets'),
  entry: {
    app: ['core-js/stable', 'regenerator-runtime/runtime', './js/index.js', './js/app.jsx'],
  },
  output: {
    publicPath: '/assets/',
    path: path.join(__dirname, 'build', 'assets'),
    filename: developmentMode ? '[name].js' : '[name]-[contenthash].js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.css', '.scss'],
  },
  devtool: developmentMode ? 'eval' : 'source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff2?|ttf|eot|ico)(\?v=.+)?$/i,
        type: 'asset/resource',
        generator: {
          filename: developmentMode ? '[name][ext]' : '[name]-[contenthash][ext]',
        },
      },
      {
        test: /\.s?css$/,
        use: [
          developmentMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name]-[contenthash].css',
      chunkFilename: '[id]-[contenthash].css',
    }),
    new WebpackManifestPlugin({
      fileName: 'manifest.json',
      publicPath: '/assets/',
      writeToFileEmit: true,
    }),
  ],
};
