const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

const nodeModules = {};
fs.readdirSync('node_modules')
  .filter((x) => {
    return ['.bin'].indexOf(x) === -1;
  })
  .filter(x => x === 'aws-sdk')
  .forEach((mod) => {
    nodeModules[mod] = 'commonjs ' + mod;
  });
module.exports = {
  entry: [
    './lambdas/renderIndexHTML.js'
  ],
  output: {
    path: __dirname,
    filename: "index.js",
    libraryTarget: 'commonjs2'
  },
  externals: nodeModules,
  target: 'node',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  }
};
