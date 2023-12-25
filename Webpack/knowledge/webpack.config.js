const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const TerserPlugin = require("terser-webpack-plugin")

module.exports = {
  mode: "development",
  context: path.resolve(__dirname, "./src"),
  entry: {
    index: {
      import: "./index.js",
      filename: "index.[contenthash:8].js",
      // dependOn: ["depend"]
    },
    main: "./main.js",
    // depend: "./depend.js"
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
        loader: "babel-loader"
      },
      {
        test: /\.webp$/,
        type: 'asset/resource',
        generator: {
          filename: "assets/[contenthash:8][ext][query]"
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
  resolve: {
    alias: {
      js: path.resolve(__dirname, "./src/js"),
      xxy$: path.resolve(__dirname, "./src/xxy/index.xxy"),
      xxy: path.resolve(__dirname, "./src/xxy")
    },
    conditionNames: ["import", "require"],
    enforceExtension: false,
    extensionAlias: {
      ".xxxy": [".xxy"]
    },
    extensions: [".js", ".css"],
    modules: ["node_modules"],
    restrictions: [/\.(css|js|xxy|webp|html)$/]
  },
  optimization: {
    chunkIds: "deterministic",
    emitOnErrors: false,
    flagIncludedChunks: true,
    mangleWasmImports: true,
    mergeDuplicateChunks: true,
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {}
      }),
      (compiler) => {
        console.log(compiler)
      },
      '...'
    ],
    moduleIds: "deterministic",
    runtimeChunk: {
      name: (entryPoint) => `runtime-${entryPoint.name}`
    },
    usedExports: true,
    providedExports: true
  },
  output: {
    clean: true,
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.[contenthash:8].js",
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
  devtool: "source-map",
  devServer: {
    client: {
      logging: "info",
      overlay: {
        errors: false,
        warnings: false
      },
      reconnect: 3,
    },
    compress: true,
    static: {
      publicPath: "/assets/"
    },
    open: true,
    port: 3333,
    onListening: (devServer) => {
      const port = devServer.server.address().port
      console.log("port:", port)
    },
    headers: [
      {
        key: "name",
        value: "xxyCoder"
      }
    ],
    proxy: {
      "/api": "http://localhost:3000",
      pathRewrite: { '^/api': '' },
      secure: true,
      bypass: (req, res, proxyOptions) => {
        if (req.headers.accept.indexOf("html") !== -1) {
          return "./index.html";
        }
      }
    }
  }
}