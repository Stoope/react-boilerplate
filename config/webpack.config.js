const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const alias = require('./alias');

module.exports = {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  entry: path.join(__dirname, '../src/index.js'),
  output: {
    pathinfo: true,
    filename: 'static/js/bundle.js',
    chunkFilename: 'static/js/[name].chunk.js',
    publicPath: '/',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: 'vendors',
    },
    runtimeChunk: true,
  },
  resolve: {
    extensions: ['.js', '.json'],
    alias,
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.js$/,
            use: [
              {
                loader: 'thread-loader',
                options: {
                  poolTimeout: Infinity,
                },
              },
              'babel-loader',
            ],
            exclude: /node_modules/,
          },
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
          },
          {
            exclude: [/\.js$/, /\.html$/, /\.json$/],
            loader: 'file-loader',
            options: {
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
    }),
    new ManifestPlugin({
      fileName: 'asset-manifest.json',
      publicPath: '/',
    }),
  ],
  devServer: {
    port: 3000,
    historyApiFallback: true,
    contentBase: path.join(__dirname, '../public'),
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000,
    },
  },
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
};
