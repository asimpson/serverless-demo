require('webpack')
const path = require('path')
const fs = require('fs')
const pages = {}
const nodeModules = {}
fs.readdirSync('node_modules')
  .filter((x) => {
    return ['.bin'].indexOf(x) === -1
  })
  .filter(x => x === 'aws-sdk')
  .forEach((mod) => {
    nodeModules[mod] = 'commonjs ' + mod
  })

fs.readdirSync('./lambdas')
  .forEach((x) => {
    var fileName = path.basename(x, '.js')
    pages[fileName] = `./lambdas/${x}`
  })
module.exports = {
  entry: pages,
  output: {
    path: __dirname,
    filename: './dist/[name].js',
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
}
