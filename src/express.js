function Express() {
    const express = require('express')
    const path = require('path');

    const webpack = require('webpack');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');
    const config = require('./webpack.config.dev');

    const template = require('./template');

    const app = express();
    var PORT = 3010;

    var compiler = webpack(config);

    app.use(webpackDevMiddleware(compiler, {
        publicPath: config.output.publicPath,
        serverSideRender: true,
        stats: { colors: true }
    }));

    app.use(webpackHotMiddleware(compiler, {
        log: console.log,
        heartbeat: 2000
    }));

    process.on("uncaughtException", function(err) {
        console.log("Caught exception: " + err);
    });

    //app.use(express.static(path.join(__dirname, 'dest')));

    app.get("/", (req, res) => {
        res.send(template({
            title: 'Quick Link App',
            body: '<h2>Quick Link App<h2>'
        }));
    });


    app.listen(3010, function() {
        console.log('Quick Link App listening on port 3000!')
    });
}

Express();