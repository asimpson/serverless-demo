const webpack = require('webpack');
module.exports = {
  entry: [
    './Root.js'
  ],
  output: {
    path: __dirname,
    filename: "index.js",
    libraryTarget: 'commonjs2'
  },
  target: 'electron',
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
