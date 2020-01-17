const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


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
                collapseWhitespace: true,//是否去除空空格
            },
        }),
        new CleanWebpackPlugin(['dist']),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        port: 80,
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
        historyApiFallback: true  
    },

};
