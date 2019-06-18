const path = require('path')

module.exports = {
  mode: 'none',
  entry: ['./client/app.js'],
  output: {
    path: path.resolve(__dirname, 'public/js'),
    filename: 'bundle.js'
  }
}
