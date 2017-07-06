const webpack = require('webpack');
//var HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

var srcPath = path.join(__dirname, 'src', 'client');
var distPath = path.join(__dirname, 'lib', 'client');

module.exports = {
    watch: true,
    node: { console: true },
    cache: true,
    devtool: 'source-map',
    context: srcPath,
    entry: {
        app: './entry.js',
    },
    output: {
        path: distPath,
        filename: '[name].bundle.js',
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            use: 'babel-loader'
        }]
    },
    resolve: {
        extensions: [".js", ".json", ".jsx", ".css"],
        modules: ["node_modules"],
    },
    plugins: [
        //new webpack.NoEmitOnErrorsPlugin()
    ]
};