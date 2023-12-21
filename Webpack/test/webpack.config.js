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
  resolveLoader: {
    modules: ["./src/loaders", "node_modules"]
  },
  module: {
    parser: {
      javascript: {
        exportsPresence: "error"
      }
    },
    noParse: /lodash/,
    rules: [
      {
        test: /\.xxy$/,
        use: ["loader-b", "loader-a"]
      },
      {
        enforce: "pre",
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
        resolve: {
          fullySpecified: true
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.webp$/,
        type: 'asset/resource',
        generator: {
          filename: "static/[contenthash:8][ext][query]"
        }
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
    }),
    new MiniCssExtractPlugin({
      filename: "external.css"
    })
  ],
  devServer: {
    static: {
      publicPath: "/assets"
    }
  }
}