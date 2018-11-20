// var webpack = require("webpack");
// var CopyWebpackPlugin = require("copy-webpack-plugin");
var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
// const BabiliPlugin = require("babili-webpack-plugin");
// const glob = require("glob");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
// const workboxPlugin = require("workbox-webpack-plugin");
// let commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common-chunks');

// var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  entry: {
    index: "./www/js/src/index.js"
  },
  output: {
    filename: "js/[name]-bundle.js",
    path: `${__dirname}/www`
  },
  // devtool: 'eval-source-map',
  devtool: "source-map",
  plugins: [
    new ExtractTextPlugin("css/main.min.css")
    // new OptimizeCssAssetsPlugin(),

    // new BabiliPlugin(),
    // new workboxPlugin({
    //   globPatterns: [
    //   ],
    //   modifyUrlPrefix: {
    //                      '': '/assets/'
    //                    },
    //    swSrc: __dirname + "/public/assets/" + 'sw-dev.js',
    //    swDest: __dirname + "/public/assets/" + 'sw.js',
    //    runtimeCaching: [{
    //             urlPattern: /api/,
    //             handler: 'networkFirst',
    //             options: {
    //               cache:{
    //               name: 'api-cache',
    //               maxEnteries: 15,
    //               maxAgeSeconds: 7 * 24 * 60 * 60
    //               }
    //             }
    //           },
    //           {
    //             urlPattern: /assets/,
    //             handler: 'cacheFirst',
    //             options: {
    //               cache:{
    //               name: 'cnn-cache',
    //               maxEnteries: 10,
    //               maxAgeSeconds: 300
    //             }
    //             }
    //           }]
    //  }),
    //  new CopyWebpackPlugin([
    //   {
    //     from: require.resolve('workbox-sw'),
    //     to: 'workbox-sw.prod.js' }
    // ])
    // new UglifyJsPlugin({
    //    exclude: [
    //      'js/merchant-bundle.js'
    //    ],
    //  }),
    // commonsPlugin
    // new BundleAnalyzerPlugin(),
  ],
  resolve: {
    modules: [
      path.resolve(__dirname, "./node_modules"),
      path.resolve(__dirname, "./www/js/src")
    ],
    extensions: [".js", ".json"]
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: "eslint-loader",
        options: {
          failOnWarning: true,
          fix: true
        }
      },
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        options: {
          presets: ["env"]
        },
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader"]
        })
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        use: "url-loader?limit=10000&mimetype=application/font-woff&name=fonts/[name].[ext]"
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        use: "url-loader?limit=10000&mimetype=application/font-woff&name=fonts/[name].[ext]"
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        use: "url-loader?limit=10000&mimetype=application/octet-stream&name=fonts/[name].[ext]"
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        use: "file-loader?name=fonts/[name].[ext]"
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: "url-loader?limit=10000&mimetype=image/svg+xml&name=fonts/[name].[ext]"
      }
    ]
  }
};
