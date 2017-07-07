const E = {
    REACT: 'REACT_DEVELOPER_TOOLS',
    REDUX: 'REDUX_DEVTOOLS',

    installExtension: function(exs) {
        const installer = require('electron-devtools-installer');
        const extensions = [].concat([E.REACT, E.REDUX]).concat(exs ? exs : []);
        extensions
            .filter(e => { return e && e.length > 0; })
            .map(name => installer.default(installer[name]));
    },

    Win: function(win) {
        this.win = win;
        return this;
    },

    sendMsg: function(win, type, msg) {
        if (win && type) win.webContents.send(type, msg);
    }
}

module.exports = E;