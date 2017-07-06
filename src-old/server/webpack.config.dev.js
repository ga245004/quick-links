const webpack = require('webpack');
//var HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

var srcPath = path.join(__dirname);
var distPath = path.join(__dirname, 'lib', 'client');

module.exports = [{
        name: "clientSide",
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
            new webpack.HotModuleReplacementPlugin({})
        ]
    },
    {
        name: "serverSide",
        watch: true,
        devtool: 'source-map',
        context: srcPath,
        target: 'node',
        entry: {
            app: path.join(__dirname, '..', 'app', 'SSR.jsx'),
        },
        output: {
            path: path.join(__dirname, '..', 'lib', 'client'),
            filename: 'SSR.js',
            libraryTarget: 'commonjs2',
            publicPath: '/client/',
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
            new webpack.HotModuleReplacementPlugin({})
        ]
    }
];