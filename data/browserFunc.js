//Browser specific code
//Firefox version
//self is coming from pageMod (see index.js)
class BrowserFunc {
    static updateNowPlaying(data) {
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
    }

    static getPlatform() {
        return self.options.platform;
    }

    static writeFile(payload) {
        self.port.emit('writeFile', payload);
        return new Promise(function (resolve, reject) {
            self.port.once(payload.filename, (status) => {
                if (status !== 'success') {
                    reject(status);
                    return;
                }
                resolve();
            });
        });
    }

    static createDirIfNotExists(payload) {
        self.port.emit('createDirIfNotExists', payload);
        return new Promise(function (resolve, reject) {
            self.port.once(payload.directory, (status) => {
                if (status !== 'success') {
                    reject(status);
                    return;
                }
                resolve();
            });
        });
    }

    static removeFile(filename) {
        self.port.emit('removeFile', filename);
    }

    static getOptions() {
        return new Promise((resolve) => {
            self.port.emit('getPrefs');
            self.port.once('prefs', function(storage) {
                resolve(storage);
            });
        });
    }

    static setOption(key, value) {
        self.port.emit('setPref', {
            'key': key,
            'value': value,
        });
    }
}

window.UNPBrowserFunc = BrowserFunc;
