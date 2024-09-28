const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: './src/scripts/main.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    filename: "scripts/[name].[contenthash:8].js",
  },
  plugins: [new HtmlWebpackPlugin({
    template: "src/index.html",
    inject: false
  }), new MiniCssExtractPlugin({
    filename: "style/[name].[contenthash:8].css",
    chunkFilename: "style/[name].[contenthash:8].chunk.css"
  }),
  new CopyPlugin({
    patterns: [
      { from: "./src/scripts/services/data/times-normal.js", to: "./scripts/services/data/times-normal.js" },
    ]
  })],
  module:{
    rules: [
        {
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader']
        }
      ]
  },
  devServer: {
    compress: true,
    historyApiFallback: true,
    open: true,
    compress: true,
    port: 9000,
  }
};