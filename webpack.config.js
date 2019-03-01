const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const modeConfig = env => require(`./build-utils/webpack.${env}.js`);

module.exports = ({ mode }) => {
  return webpackMerge(
    {
      mode,
      devtool: 'source-map',
      entry: ['./src/index.js'],
      output: {
        path: path.join(__dirname, './dist'),
        filename: 'bundle.js',
      },
      module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: ['babel-loader'],
          },
          {
            test: /\.(eot|svg|ttf|woff|woff2)$/,
            use: 'file-loader',
          },
          {
            test: /\.(png|gif|jpg)$/i,
            use: [
              {
                loader: 'url-loader',
                options: {
                  limit: 8192, // only if size < 8192 image will fit, if not use url
                },
              },
            ],
          },
        ],
      },
      plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin(['dist']),
        new webpack.ProgressPlugin(),
        new HtmlWebpackPlugin({
          filename: 'index.html',
          template: './index.html',
        }),
      ],
    },
    modeConfig(mode),
  );
};
