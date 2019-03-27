const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

<<<<<<< HEAD
const isFront = process.env.CLIENT_ENV !=='back';
module.exports = {
  mode: "development",
  devtool: "soure-map",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    chunkFilename: "[name].js"
  },
  plugins: [
    new HtmlWebpackPlugin({
      template:  isFront ? path.resolve(__dirname, "./html/front.html"):path.resolve(__dirname, "./html/back.html"),
      chunks: isFront ? ["front","common"]:["back","common"],
      minify: {
        collapseWhitespace: true
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 8000,
    hot: true,
    compress: true,
    overlay: true
  }
=======
const isBack = process.env.CLIENT_ENV === 'back';
module.exports = {
    mode: 'development',
    devtool: 'soure-map',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, isBack ? './html/back.html' : './html/front.html'),
            chunks: isBack? ['back']: ['front'],
            minify: {
                collapseWhitespace: true,
            },
        }),
        new CleanWebpackPlugin(['dist']),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        port: 8000,
        hot: true,
        compress: true,
        overlay: true,
        // proxy: {
        //   "/comments": {
        //     target: "https://m.weibo.cn",
        //     changeOrigin: true,
        //     logLevel: "debug",
        //     headers: {
        //       Cookie: ""
        //     }
        //   }
        // },
        // historyApiFallback: true
    },
>>>>>>> master
};
