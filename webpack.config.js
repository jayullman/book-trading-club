var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');

var config = {
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
  // devtool: 'eval-source-map',
  watch: true,
  plugins: [
    new ExtractTextPlugin('styles.css')
  ]
}

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new webpack.optimize.UglifyJsPlugin()
  );
}

module.exports = config;