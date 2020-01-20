import path from 'path';
import chalk from 'chalk';
import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import webpackSimpleProgressPlugin from 'webpack-simple-progress-plugin';
import tsImportPluginFactory from 'ts-import-plugin';

export type configType = [string, any];

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
  entry: entryFunc(isDev, isBack),
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.scss'],
    alias: {
      src: path.resolve(__dirname, '../src/'),
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
  ],
};

export default commonConfig;
