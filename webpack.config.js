const webpack = require('webpack');
const path = require('path');

var srcPath = path.join(__dirname, 'src');
var distPath = path.join(__dirname, 'lib');

module.exports = {
    watch: true,
    cache: true,
    devtool: 'source-map',
    context: srcPath,
    entry: {
        app: './index.js',
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
        new webpack.NoEmitOnErrorsPlugin()
    ]
};