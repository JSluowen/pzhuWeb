const path = require('path');
import common from './webpack.common';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import webpackMerge from 'webpack-merge';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const prodConfig: webpack.Configuration = webpackMerge(common, {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name]_[hash].js',
    chunkFilename: '[name]_[hash].js]',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE: "'production'",
      },
    }),
    new MiniCssExtractPlugin({
      filename: '[name]_[hash].css',
      chunkFilename: '[id]_[hash].css',
    }),
    new HtmlWebpackPlugin({
      hash: true, // 向html 引入的src链接后增加hash值，取消缓存
      filename: 'front.html',
      template: path.resolve(__dirname, '../html/front.html'),
      chunks: ['front'],
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
      },
    }),
    new HtmlWebpackPlugin({
      hash: true, //向html 引入的src链接后增加hash值，取消缓存
      filename: 'back.html',
      template: path.resolve(__dirname, '../html/back.html'),
      chunks: ['back'],
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
      },
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
});

export default prodConfig;
