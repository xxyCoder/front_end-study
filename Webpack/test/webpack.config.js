const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
  mode: "development",
  context: path.resolve(__dirname, "./src"),
  entry: {
    index: {
      import: "./index.js",
      filename: "index.[contenthash:8].js",
      dependOn: ["react-vendor", "depend"]
    },
    main: "./main.js",
    "react-vendor": ["react"],
    depend: "./depend.js"
  },
  module: {
    rules: [
      {
        test: /\.webp$/,
        type: 'asset/resource'
      },
      {
        test: /\.css$/,
        oneOf: [
          {
            resourceQuery: /external/,
            use: [MiniCssExtractPlugin.loader, 'css-loader'],
          },
          {
            use: ['style-loader', 'css-loader']
          }
        ]
      },
    ]
  },
  output: {
    clean: true,
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
    assetModuleFilename: "assets/[contenthash:8][ext][query]",
    asyncChunks: true
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./index.html")
    })
  ],
  devServer: {
    static: {
      publicPath: "/assets"
    }
  }
}