console.log("starting webpack service");

try {
    start();
} catch (error) {
    console.log(error);
}

function start() {
    const config = require('./webpack.config.js');
    const webpack = require('webpack');

    webpack(config).run(function(error, stats) {
        if (error) {
            console.log(error);
        } else {
            if (stats.compilation.errors.length) {

                stats.compilation.errors.forEach(function(e, t) {
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

                    if (dep) {
                        installCount++;
                        install(dep, function(response) {
                            start();
                        });
                    }

                }, this);
            }
        }
    });
}

var installCount = 0;

function install(dep, callBack) {

    if (installCount > 5) {
        process.exit(-1);
    }

    var cmd = 'cmd.exe'
    var args = ['/c', 'yarn', 'add', dep];
    console.log("Installing module : " + dep);
    run_cmd(cmd, args, callBack);
}

function run_cmd(cmd, args, callBack) {
    var spawn = require('child_process').spawn;
    var child = spawn(cmd, args);
    var resp = "";

    child.stdout.on('data', function(buffer) { resp += buffer.toString() });
    child.stdout.on('end', function() { callBack(resp) });
}