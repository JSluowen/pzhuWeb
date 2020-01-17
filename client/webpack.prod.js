'use strict';
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]_[hash].js',
    chunkFilename: '[name]_[hash].js',
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name]_[hash].css',
      chunkFilename: '[id]_[hash].css',
    }),
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './html/front.html',
      chunks: ['front'],
      minify: {
        collapseWhitespace: true, // 是否去除空空格
      },
    }),
    new HtmlWebpackPlugin({
      filename: 'admin.html',
      template: './html/back.html',
      chunks: ['back'],
      minify: {
        collapseWhitespace: true, // 是否去除空空格
      },
    }),
  ],
};
