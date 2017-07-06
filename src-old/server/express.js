const express = require("express");

const path = require('path');

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config.dev');

var app = express();
var PORT = 3010;

app.use(express.static(path.join(__dirname, "..", "..", "lib", "client")));

var compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
    publicPath: config[1].output.publicPath,
    stats: { colors: true }
}));

app.use(webpackHotMiddleware(compiler, {
    log: console.log
}));

process.on("uncaughtException", function(err) {
    console.log("Caught exception: " + err);
});

app.use('/', function(req, res) {
    //const handleRender = require('./handle-render.jsx');
    const render = require('../../lib/server/SSR');
    return render.default(req, res);
    //return handleRender(req, res);
});


app.listen(PORT, function() {
    console.log("quick link server running on " + PORT);
});