app.controller('SettingsCtrl', function SettingsCtrl(storage, Utils, $translate, $sce) {
    const vm = this;

    vm.save = save;

    if (storage.unpSaveDir !== undefined) {
        vm.saveDir = storage.unpSaveDir;
    } else {
        $translate('warn_opt').then((msg) => {
            vm.messageType = 'warn';
            vm.message = $sce.trustAsHtml(msg);
        });
        if (window.UNPBrowserFunc.getPlatform() === 'winnt')
            vm.saveDir = 'C:\\Users\\USERNAME\\Documents\\unp\\';
        else if (window.UNPBrowserFunc.getPlatform() === 'linux')
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
    vm.noMusicMessage = getConfigValue('unpNoMusicMessage', '');
    vm.browserNotification = getConfigBool('unpNotification', true);

    function getConfigValue(key, defaultVal) {
        const val = storage[key];
        return (!$.isEmptyObject(val) || Number.isInteger(val)) ? val : defaultVal;
    }

    function getConfigBool(key, defaultVal) {
        const val = storage[key];
        return (val !== undefined) ? val : defaultVal;
    }

    vm.savePending = false;

    function save() {
        vm.savePending = true;
        if (window.UNPBrowserFunc.getPlatform() === 'winnt') {
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
            window.UNPBrowserFunc.setOption('unpSaveDir', vm.saveDir);
            window.UNPBrowserFunc.setOption('unpSaveFormat', vm.saveFormat);
            window.UNPBrowserFunc.setOption('unpFilename', vm.filename);
            window.UNPBrowserFunc.setOption('unpTxtFormat', vm.txtFormat);
            window.UNPBrowserFunc.setOption('unpSongMaxLen', vm.songMaxlen);
            window.UNPBrowserFunc.setOption('unpSongMaxLenApp', vm.songMaxlenAppend);
            window.UNPBrowserFunc.setOption('unpAlbumArtwork', vm.albumArtwork);
            window.UNPBrowserFunc.setOption('unpDisableYoutube', vm.disableYoutube);
            window.UNPBrowserFunc.setOption('unpAutoClear', vm.autoClear);
            window.UNPBrowserFunc.setOption('unpNoMusicMessage', vm.noMusicMessage);
            window.UNPBrowserFunc.setOption('unpNotification', vm.browserNotification);

            $translate('opt_saved').then((msg) => {
                vm.messageType = 'success';
                vm.message = $sce.trustAsHtml(msg);
            });
            vm.savePending = false;
        }).catch(() => {
            vm.savePending = false;
        });
    };

    function validateOptions() {
        if (vm.saveDir.indexOf('windows') !== -1) {
            $translate('err_directory_win').then((msg) => {
                vm.messageType = 'error';
                vm.message = $sce.trustAsHtml(msg);
            });
            return Promise.reject();
        }

        const testFilename = vm.saveDir + vm.filename + '_write_test_53642784162133643354.txt';
        return window.UNPBrowserFunc.createDirIfNotExists({
            directory: vm.saveDir
        }).then(() => {
            return window.UNPBrowserFunc.writeFile({
                filename: testFilename,
                text: 'Just a quick test to ensure we can write to this directory! :)'
            });
        }).then(() => {
            window.UNPBrowserFunc.removeFile(testFilename);
        }).catch((reason) => {
            $translate('err_directory_inaccess').then((msg) => {
                vm.messageType = 'error';
                vm.message = $sce.trustAsHtml(msg + ' (' + reason + ')');
            });
            return Promise.reject();
        });
    }
});
