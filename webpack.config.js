const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
 module.exports = {
   entry: './src/main.js',
   output: {
     filename: 'bundle.js',
     path: path.resolve(__dirname, 'dist')
   },
   plugins: [
         new HtmlWebpackPlugin({
          title: 'Your Page Name',
          template: './src/index.html',
          inject: 'body'
          })
        ],
   module: {
     rules: [
       {
         test: /\.css$/,
         use: [
           'style-loader',
           'css-loader'
         ]
       }
     ]
   }
 };
