const path = require("path")
const webpack = require("webpack")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const glob = require('glob')
const fs = require("fs");

function generate_index() {
    return "<html><title>p5 sketchbook</title><body><link rel=\"stylesheet\" href=\"./index.css\">" + glob.sync('./src/**.ts').reduce(function(obj, el){
        const name = path.parse(el).name
        const statsObj = fs.statSync(el);
        return obj.concat(`<a href="${name}.html">${name}</a> ${statsObj.birthtime.toLocaleDateString()}<br>`)
    }, "") + "</body></html>"
}

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
                template: "./public/page.html",
                inject: "body",
                publicPath: "./",
                filename: `${name}.html`,
                chunks: [`${name}`]
              }))
    return obj
  },[
      new HtmlWebpackPlugin({
      templateContent: generate_index(),
      filename: 'index.html',
      chunks: [],
      }),
  ]),
}