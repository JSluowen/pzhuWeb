import path from 'path';
import chalk from 'chalk';
import webpack from 'webpack';
import webpackSimpleProgressPlugin from 'webpack-simple-progress-plugin';
import tsImportPluginFactory from 'ts-import-plugin';
export type configType = [string, any];

import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';



function caseEnv(config: configType) {
  return process.env.NODE_ENV === 'development' ? config[0] : config[1];
}

function entryFunc(env: Boolean, isBack: Boolean) {
  if (isDev) {
    return {
      main: path.resolve(__dirname, isBack ? '../src/back/main.tsx' : '../src/front/main.tsx'),
    };
  } else {
    return {
      front: path.resolve(__dirname, '../src/front/main.tsx'),
      back: path.resolve(__dirname, '../src/back/main.tsx'),
    };
  }
}

const isBack = process.env.CLIENT_ENV === 'back';
const isDev = process.env.NODE_ENV === 'development';

const commonConfig: webpack.Configuration = {
  mode: 'production',
  entry: entryFunc(isDev, isBack),
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name]_[hash].js',
    chunkFilename: '[name]_[hash].js]',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.scss'],
    alias: {
      src: path.resolve(__dirname, '../src/'),
      '@': path.resolve(__dirname, '../src/'),
      front: path.resolve(__dirname, '../src/front/'),
      back: path.resolve(__dirname, '../src/back/'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          caseEnv(['style-loader', MiniCssExtractPlugin.loader]),
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              // eslint-disable-next-line @typescript-eslint/no-require-imports
              plugins: () => [require('autoprefixer')],
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)/,
        use: {
          loader: 'url-loader',
          options: {
            outputPath: 'images/', // 图片输出的路径
            limit: 10 * 1024,
          },
        },
      },
      {
        test: /\.(eot|woff2?|ttf|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name]-[hash:5].min.[ext]',
              limit: 5000, // fonts file size <= 5KB, use 'base64'; else, output svg file
              publicPath: 'fonts/',
              outputPath: 'fonts/',
            },
          },
        ],
      },
      {
        test: /\.(jsx)?$/,
        exclude: /node_modules/, // 排除掉nod_modules,优化打包速度
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.(ts|tsx)$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          transpileOnly: true,
          getCustomTransformers: () => ({
            before: [
              tsImportPluginFactory({
                libraryName: 'antd',
                libraryDirectory: 'es',
                style: 'css',
              }),
            ],
          }),
          compilerOptions: {
            module: 'es2015',
          },
        },
      },
    ],
  },
  plugins: [
    // eslint-disable-next-line new-cap
    new webpackSimpleProgressPlugin({
      messageTemplate: [':bar', chalk.green(':percent'), ':msg'].join(' '),
      progressOptions: {
        complete: chalk.bgGreen(' '),
        incomplete: chalk.bgWhite(' '),
        width: 40,
        total: 100,
        clear: false,
      },
    }),
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: "'production'",
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
      hash: true, // 向html 引入的src链接后增加hash值，取消缓存
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
};

export default commonConfig;
