const pm2 = require('pm2');


function handelCallback(err, disconnect, callbackFn, args) {

    if (disconnect) pm2.disconnect();
    if (err) throw err;
    if (callbackFn) callbackFn(args);
}


const PM = {

    ONLINE: 'online',

    isOnline: function(proc) {
        if (proc && (proc.status && proc.status == PM.ONLINE ||
                proc.length > 0 && proc[0].status == PM.ONLINE)) {
            return true;
        } else {
            return false;
        }
    },

    connect: function(disconnect, callbackFn) {
        pm2.connect(function(err) {
            handelCallback(err, disconnect, callbackFn);
        });
    },

    start: function(options, callbackFn) {
        options = Object.assign({}, options);
        if (options.script) {
            PM.connect(false, function() {
                pm2.start(options, function(s_err, proc) {
                    handelCallback(s_err, true, callbackFn, proc);
                });
            });
        } else {
            throw new Error('Script path not defined.');
        }
    }
};

module.exports = PM;