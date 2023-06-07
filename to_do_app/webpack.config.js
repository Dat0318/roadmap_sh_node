const path = require('path');
const webpack = require('webpack');

module.exports = {
  target: 'node',
  entry: './src/main.js',
  mode: 'production',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [new webpack.BannerPlugin({ banner: '#!/usr/bin/env node', raw: true })],
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.vue'],
    alias: {
      vue: '@vue/runtime-dom',
    },
  },
};
