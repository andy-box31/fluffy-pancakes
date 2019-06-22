const path = require('path')

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: path.join(__dirname, 'client', 'index.jsx'),
  output: {
    path: path.resolve(__dirname, 'public/js'),
    filename: 'bundle.js'
  },
  resolve: {
    // Allow js and jsx files to be resolved without an extension
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        // this is so that we can compile any React,
        // ES6 and above into normal ES5 syntax
        test: /\.(js|jsx)$/,
        // we do not want anything from node_modules to be compiled
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(css)$/,
        use: [
          'style-loader',
          // creates style nodes from JS strings
          'css-loader'
          // translates CSS into CommonJS
        ]
      },
      {
        test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
        loaders: ['file-loader']
      }
    ]
  }
}
