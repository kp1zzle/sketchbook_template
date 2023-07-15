const path = require("path")
const webpack = require("webpack")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const glob = require('glob')
const fs = require("fs");

function determineDateForFile(path) {
    const regex = new RegExp('(?<=Date:).*')
    const fileTextA = fs.readFileSync(path, 'utf8')
    const matchesA = regex.exec(fileTextA)
    if (matchesA != null) {
        return new Date(Date.parse(matchesA[0]))
    } else {
        const statsObjA = fs.statSync(path);
        return statsObjA.birthtime
    }
}

function sortFn(a, b) {
    const dateA = determineDateForFile(a)
    const dateB = determineDateForFile(b)

    if (dateA.valueOf() === dateB.valueOf()) {
        return 0
    } else if (dateA.valueOf() > dateB.valueOf()) {
        return 1
    } else {
        return -1
    }
}

function generate_index() {
    const regex = new RegExp('(?<=Description:).*')
    return "<html><title>p5 sketchbook</title><body><link rel=\"stylesheet\" href=\"./index.css\"><a class=\"backButton\" href='https://kieran.lol'>BACK</a><h1>KIERAN'S SKETCHBOOK</h1><br><br>" + glob.sync('./src/**.ts').sort(sortFn).reverse().reduce(function(obj, el){
        const name = path.parse(el).name
        const fileText = fs.readFileSync(el, 'utf8')
        const matches =  regex.exec(fileText)
        let description = "No description provided."
        if (matches !== null && matches.length === 1) {
             description =  matches[0]
        }
        return obj.concat(`<a href="${name}.html">${name}</a><p class="date">${determineDateForFile(el).toLocaleDateString()}</p><p class="description">${description}</p><br>`)
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