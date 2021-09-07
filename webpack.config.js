const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    main: './src/index.js',
    analitics: './src/analitics.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
  },
};
