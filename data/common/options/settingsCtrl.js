app.controller('SettingsCtrl', function SettingsCtrl(Storage, Utils, $translate) {
    const vm = this;

    vm.save = save;

    if (Storage.get('unpSaveDir') !== undefined) {
        vm.saveDir = Storage.get('unpSaveDir');
    } else {
        $translate('warn_opt').then((msg) => {
            Utils.alert('warn', msg);
        });
        if (BrowserFunc.getPlatform() === 'winnt')
            vm.saveDir = 'C:\\Users\\USERNAME\\Documents\\unp\\';
        else if (BrowserFunc.getPlatform() === 'linux')
            vm.saveDir = '/home/USERNAME/unp/';
    }

    vm.filename = getConfigValue('unpFilename', 'unp_now_playing');
    vm.txtFormat = getConfigValue('unpTxtFormat', '%s%');
    vm.saveFormat = getConfigValue('unpSaveFormat', 'txt');
    vm.songMaxlen = getConfigValue('unpSongMaxLen', 60);
    vm.songMaxlenAppend = getConfigBool('unpSongMaxLenApp', true);
    vm.albumArtwork = getConfigBool('unpAlbumArtwork', true);
    vm.disableYoutube = getConfigBool('unpDisableYoutube', false);
    vm.autoClear = getConfigBool('unpAutoClear', false);
    vm.browserNotification = getConfigBool('unpNotification', true);

    function getConfigValue(key, defaultVal) {
        const val = Storage.get(key);
        return (!Utils.empty(val)) ? val : defaultVal;
    }

    function getConfigBool(key, defaultVal) {
        const val = Storage.get(key);
        return (val !== undefined) ? val : defaultVal;
    }

    vm.savePending = false;

    function save() {
        vm.savePending = true;
        if (BrowserFunc.getPlatform() === 'winnt') {
            vm.saveDir = vm.saveDir.split('/').join('\\');
            if (vm.saveDir.substr(vm.saveDir.length - 1) != '\\') {
                vm.saveDir = vm.saveDir + '\\';
            }
        } else {
            if (vm.saveDir.substr(vm.saveDir.length - 1) != '/') {
                vm.saveDir = vm.saveDir + '/';
            }
        }

        validateOptions().then(() => {
            Storage.set('unpSaveDir', vm.saveDir);
            Storage.set('unpSaveFormat', vm.saveFormat);
            Storage.set('unpFilename', vm.filename);
            Storage.set('unpTxtFormat', vm.txtFormat);
            Storage.set('unpSongMaxLen', vm.songMaxlen);
            Storage.set('unpSongMaxLenApp', vm.songMaxlenAppend);
            Storage.set('unpAlbumArtwork', vm.albumArtwork);
            Storage.set('unpDisableYoutube', vm.disableYoutube);
            Storage.set('unpAutoClear', vm.autoClear);
            Storage.set('unpNotification', vm.browserNotification);

            $translate('opt_saved').then((msg) => {
                Utils.alert('success', msg);
            });
            vm.savePending = false;
        }).catch(() => {
            vm.savePending = false;
        });
    };

    function validateOptions() {
        if (vm.saveDir.indexOf('windows') !== -1) {
            $translate('err_directory_win').then((msg) => {
                Utils.alert('error', msg);
            });
            return Promise.reject();
        }

        const testFilename = vm.saveDir + vm.filename + '_write_test_53642784162133643354.txt';
        return BrowserFunc.writeFile({
            filename: testFilename,
            text: 'Just a quick test to ensure we can write to this directory! :)'
        }).then(() => {
            BrowserFunc.removeFile(testFilename);
        }).catch(() => {
            $translate('err_directory_inaccess').then((msg) => {
                Utils.alert('error', msg);
            });
            return Promise.reject();
        });
    }
});
