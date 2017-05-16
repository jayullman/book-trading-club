var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './client/index.js',
  output: {
    filename: 'app.js',
    path: path.join(__dirname, '/public')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          { loader: 'babel-loader' },
          {
            loader: 'eslint-loader',
          }
        ]
      }, {
        test: /\.css$/,
        use: ExtractTextPlugin.extract('css-loader')
      }
    ]
  },
  devServer: {
    contentBase: __dirname + '/public'
  },
  devtool: 'eval-source-map',
  watch: true,
  plugins: [
    new ExtractTextPlugin('styles.css')
  ]
}
