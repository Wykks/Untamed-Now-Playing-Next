//Browser specific code
//Firefox version
//self is coming from pageMod (see index.js)
var BrowserFunc = (function () { //eslint-disable-line no-var
    BrowserFunc = {};

    BrowserFunc.updateNowPlaying = function (data) {
        self.port.emit('updateNowPlaying', data);
        return new Promise(function (resolve, reject) {
            self.port.once('updateNowPlaying', function (status) {
                if (status === 'success') {
                    resolve(status);
                } else {
                    reject(status);
                }
            });
        });
    };

    //READONLY !
    BrowserFunc.getPlatform = function () {
        return self.options.platform;
    };

    BrowserFunc.writeFile = function (payload) {
        self.port.emit('writeFile', payload);
        return new Promise(function (resolve, reject) {
            self.port.once(payload.filename, (status) => {
                if (status !== 'success') {
                    reject();
                    return;
                }
                resolve();
            });
        });
    };

    BrowserFunc.removeFile = function (filename) {
        self.port.emit('removeFile', filename);
    };

    BrowserFunc.getOptions = function() {
        return new Promise((resolve) => {
            self.port.emit('getPrefs');
            self.port.once('prefs', function(storage) {
                resolve(storage);
            });
        });
    };

    BrowserFunc.setOption = function(key, value) {
        self.port.emit('setPref', {
            'key': key,
            'value': value,
        });
    };

    return BrowserFunc;
}());
