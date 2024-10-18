const path = require("path");

module.exports = {
  entry: "./frontend/entry.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "app", "javascript"),
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [{ loader: "babel-loader" }],
        exclude: /node_modules/,
      },
    ],
  },
};
