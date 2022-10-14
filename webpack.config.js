const glob = require('glob')
const path = require('path')

module.exports = {
  mode: 'production',
  entry: glob.sync('./static/js/*.js'),

  output: {
    path: path.join(__dirname, 'static/dist'),
    filename: '[name].[chunkhash].js',
  },
}
