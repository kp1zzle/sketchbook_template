const path = require("path")
const webpack = require("webpack")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const glob = require('glob')

module.exports = {
  entry: glob.sync('./src/**.ts').reduce(function(obj, el){
    obj[path.parse(el).name] = "./" + el;
    return obj
  },{}),
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "[name].js",
    clean: true
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  module: {
    rules: [
      {
        test: /\.(glsl|vs|fs|vert|frag)$/i,
        exclude: /node_modules/,
        use: 'raw-loader',
      },
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: glob.sync('./src/**.ts').reduce(function(obj, el){
    const name = path.parse(el).name
    obj.push(
        new HtmlWebpackPlugin({
                template: "./public/index.html",
                inject: "body",
                publicPath: "./",
                filename: `${name}.html`,
                chunks: [`${name}`]
              }))

    return obj
  },[]),
}