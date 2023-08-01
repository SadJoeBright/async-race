const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const EslintPlugin = require('eslint-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, 'src/index'),
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, './dist'),
    assetModuleFilename: path.join('assets/icons', '[name].[contenthash][ext]'),
    clean: true,
  },

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.ts$/i,
        use: 'ts-loader',
      },
      {
        test: /\.(png|svg|)$/i,
        type: 'asset/resource',
        generator: {
            filename: 'assets/icons/[name][ext]',
        },
    }
    ],
  },

  resolve: {
    extensions: ['.ts', '.js'],
  },

  devtool: 'inline-source-map',

  plugins: [
    new HtmlWebpackPlugin ({
      template: path.resolve(__dirname, 'src', 'index.html'),
    }),
    new EslintPlugin({ extensions: 'ts' }),
  ],
  
  devServer: {
    watchFiles: path.resolve(__dirname, 'src'),
    port: 9000
  },
}