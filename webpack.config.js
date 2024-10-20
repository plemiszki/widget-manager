const path = require("path");

module.exports = {
  entry: "./frontend/entry.tsx",
  output: {
    filename: "bundle2.js",
    path: path.resolve(__dirname, "app", "javascript"),
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [{ loader: "babel-loader" }],
        exclude: /node_modules/,
      },
      {
        test: /\.tsx?$/,
        use: [{ loader: "ts-loader" }],
        exclude: /node_modules/,
      },
    ],
  },
  devtool: false,
};
