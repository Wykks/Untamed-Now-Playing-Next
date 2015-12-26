//Browser specific code
//Firefox version
//self is coming from pageMod (see index.js)
let BrowserFunc = (function () {
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

    BrowserFunc.setOption = function (key, value) {
        self.port.emit('setValue', {
            'key': key,
            'value': value,
        });
    };

    BrowserFunc.getOption = function (key) {
        return self.options.storage[key];
    };

    return BrowserFunc;
}());
