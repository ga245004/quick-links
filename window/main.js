try {
    const path = require('path');
    const { app, BrowserWindow } = require('electron');
    const url = require('url');

    const PM = require('../services/pm');
    const E = require('../services/e');

    let win;

    start();


    function runExpress(win) {

        var pm2Options = {
            name: 'quick-link-app',
            script: path.join(__dirname, '..', 'src', 'express.js'),
            exec_mode: 'fork',
            instances: 1,
            cwd: __dirname

        };

        PM.start(pm2Options, function(proc) {

            if (PM.isOnline(proc)) {
                E.sendMsg(win, 'redirectToServer', 'http://localhost:3010/');
            } else {
                E.sendMsg(win, 'errored', 'Server failed initialization. check logs');
            }
        });

    }


    function start() {
        function createWindow() {
            win = new BrowserWindow({ width: 800, height: 600, show: false, });
            win.loadURL(url.format({
                pathname: path.join(__dirname, 'index.html'),
                protocol: 'file:',
                slashes: true
            }));

            // Install Chrome Extensions and Open the DevTools.
            E.installExtension();
            //win.webContents.openDevTools();          

            win.webContents.on("did-finish-load", () => {
                if (!win) throw new Error('"mainWindow" is not defined');
                win.show();
                win.focus();
            });

            win.on('closed', () => { win = null });

            setTimeout(runExpress, 5 * 1000, win);
        }
        app.on('ready', createWindow);
        app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
        app.on('activate', () => { if (win === null) createWindow(); });
    }
} catch (error) {
    console.log(error);
}