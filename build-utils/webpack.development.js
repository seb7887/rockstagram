const path = require('path');
const webpack = require('webpack');

module.exports = {
  plugins: [new webpack.NoEmitOnErrorsPlugin()],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
