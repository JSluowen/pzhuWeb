const path = require('path');
import webpack from 'webpack';
import webpackMerge from 'webpack-merge';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import common from './webpack.common';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
const isBack = process.env.CLIENT_ENV === 'back';

const devConfig: webpack.Configuration = webpackMerge(common, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: "'development'",
      },
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, isBack ? '../html/back.html' : '../html/front.html'),
      minify: {
        collapseWhitespace: true, //是否去除空空格
      },
    }),
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: isBack ? 8001 : 8080,
    hot: true,
    compress: true,
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

export default devConfig;
