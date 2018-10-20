const path = require('path');
const nodeExternals = require('webpack-node-externals');
const TerserPlugin = require('terser-webpack-plugin');
const alias = require('./alias');

module.exports = {
  mode: 'production',
  target: 'node',
  externals: [nodeExternals()],
  devtool: false,
  entry: path.join(__dirname, '../server/server.js'),
  output: {
    path: path.join(__dirname, '../buildSSR'),
    filename: 'index.js',
    libraryTarget: 'umd',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.json'],
    alias,
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: false,
      }),
    ],
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.js$/,
            use: [
              'thread-loader',
              {
                loader: 'babel-loader',
              },
            ],
            exclude: /node_modules/,
          },
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'static/media/[name].[hash:8].[ext]',
              emitFile: false,
            },
          },
          {
            loader: 'file-loader',
            exclude: [/\.js$/, /\.html$/, /\.json$/],
            options: {
              name: 'static/media/[name].[hash:8].[ext]',
              emitFile: false,
            },
          },
        ],
      },
    ],
  },
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
};
