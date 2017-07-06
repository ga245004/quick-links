console.log("starting webpack service");

try {
    start();
} catch (error) {
    console.log(error);
}

function start() {
    const configClient = require('./webpack.config.client.js');
    const configServer = require('./webpack.config.server.js');
    const RunnerPlugin = require('./RunnerPlugin');
    const webpack = require('webpack');

    var runner = new RunnerPlugin({
        "watch-run": WatchRun
    });

    //configClient.plugins = [runner].concat(configClient.plugins);
    configServer.plugins = [runner].concat(configServer.plugins);

    var compiler = webpack([configClient, configServer], function(error, stats) {
        if (error) {
            console.log(error);
        } else if (stats.stats && stats.stats.length > 0) {
            stats.stats.forEach(webpackCallback);
        } else {
            webpackCallback(stats);
        }
    });
}

function webpackCallback(stats) {
    if (stats.hasErrors()) {
        stats.compilation.errors.forEach(function(e, t) {
            processError(e);
        }, this);
        if (installModule.length > 0) {
            var modules = [];
            installModule.forEach((dep) => {

                if (modules.length == 0) {
                    modules.push(dep);
                } else {
                    modules.forEach((m) => {
                        if (m !== dep) {
                            modules.push(dep);
                        }
                    });
                }
            });
            installModule = [];
            install(modules, function(res) {
                //start();
            });
        }
    }
}
var installModule = [];
var alreadyInstalled = [];

function processError(e) {
    var error = e.error;
    var module = e.module;
    console.log(error.message);
    if (error.loc) {
        console.log("At Line number =" + error.loc.line);
        console.log("At char number =" + error.loc.column);
    }
    if (module) {
        console.log("In file =" + module.resource);
    }
    var dep;
    if (error.message.indexOf("Can't resolve") >= 0) {
        dep = error.message.split("'")[2];
    } else if (error.message.indexOf("Cannot find module") >= 0) {
        dep = error.message.split("'")[1];
    } else if (error.message.indexOf("Couldn't find preset") >= 0) {
        dep = "babel-preset-" + error.message.split('"')[1];
    }

    if (dep && dep.indexOf('.') != 0) {
        installModule.push(dep);
    }
}

function WatchRun(watching, callback) {
    var changedTimes = watching.compiler.watchFileSystem.watcher.mtimes;
    var changedFiles = Object.keys(changedTimes);
    for (var i in changedFiles) {
        changedFiles[i] = "     " + changedFiles[i];
    }
    if (changedFiles.length) {
        console.log("Files changed:\n" + changedFiles.join("\n"));
        console.log("webpack rebuilding the bundle..");
    }
}


var installCount = 0;


function install(modules, callBack) {

    if (installCount > 5) {
        process.exit(-1);
    }

    if (modules && modules.length == 0) {
        return;
    }

    var cmd = 'cmd.exe'
    var args = ['/c', 'yarn', 'add'].concat(modules);
    console.log("Installing module : " + modules);
    run_cmd(cmd, args, callBack);
}

function run_cmd(cmd, args, callBack) {
    var spawn = require('child_process').spawn;
    var child = spawn(cmd, args, {
        cwd: __dirname
    });
    var resp = "";

    child.stdout.on('data', function(buffer) {
        resp += buffer.toString();
        console.log(buffer.toString())
    });

    child.stdout.on('end', function() {
        callBack(resp);
    });
}