const common = require('./webpack.common.ts');
const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const isBack = process.env.CLIENT_ENV === 'back';

const devConfig = webpackMerge(common, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
    publicPath: '/',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: "'development'",
      },
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, isBack ? '../html/back.html' : '../html/front.html'),
    }),
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: isBack ? 8001 : 8080,
    hot: true,
    compress: false,
    proxy: {
      //   "/api": {
      //     target: "https://47.107.106.113:7001",
      //     changeOrigin: true,
      //     logLevel: "debug",
      //     headers: {
      //       Cookie: ""
      //     }
      //   }
    },
    historyApiFallback: true,
  },
});

module.exports = devConfig;
