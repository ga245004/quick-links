const webpack = require('webpack');
const path = require('path');


module.exports = {
    name: "clientSide",
    devtool: 'source-map',
    target: 'web',
    context: __dirname,
    node: {
        __dirname: false,
    },
    entry: [
        'babel-polyfill',
        'react-hot-loader/patch',
        'webpack-hot-middleware/client',
        './entry.js',
    ],
    output: {
        filename: 'bundle.js',
        publicPath: '/dist'
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            use: 'babel-loader',
            exclude: /node_modules/
        }]
    },
    resolve: {
        extensions: [".js", ".json", ".jsx", ".css"],
        modules: ["node_modules"],
    },
    plugins: [
        //new webpack.NoEmitOnErrorsPlugin()
        new webpack.HotModuleReplacementPlugin({}),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"development"',
            // 'global': {}, // bizarre lodash(?) webpack workaround
            'global.GENTLY': false // superagent client fix
        })
    ]
};