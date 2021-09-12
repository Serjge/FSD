const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: {
    main: './index.js',
    analitics: './analitics.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
  },
  resolve: {
    extensions: ['.js', '.png', '.json', '.css'], // настройка сокращений по умолчанию не нужно писать в импорте
    alias: {
      '@assents': path.resolve(__dirname, 'src/assents'), // настройка относительного пути
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@': path.resolve(__dirname, 'src'),
    },
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  devServer: {
    port: 4200,
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './index.html',
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/favicon.ico'), // откуда копировать файл или папку
          to: path.resolve(__dirname, 'dist'), // куда копировать файл или папку
        },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'file-loader',
        options: {
          outputPath: 'images',
          publicPath: 'assets',
          name: '/[contenthash].[ext]',
        },
      },
      {
        test: /\.(ttf|woff|woff2|oet)$/i,
        loader: 'file-loader',
        options: {
          outputPath: 'fonts',
          publicPath: 'assets',
          name: '/[contenthash].[ext]',
        },
      },
    ],
  },
};
