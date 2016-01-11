app.controller('SettingsCtrl', function SettingsCtrl(Utils, $translate, $sce) {
    const vm = this;

    vm.save = save;

    if (BrowserFunc.getOption('unpSaveDir') !== undefined) {
        vm.saveDir = BrowserFunc.getOption('unpSaveDir');
    } else {
        $translate('warn_opt').then((msg) => {
            vm.messageType = 'warn';
            vm.message = $sce.trustAsHtml(msg);
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
        const val = BrowserFunc.getOption(key);
        return (!$.isEmptyObject(val)) ? val : defaultVal;
    }

    function getConfigBool(key, defaultVal) {
        const val = BrowserFunc.getOption(key);
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
            BrowserFunc.setOption('unpSaveDir', vm.saveDir);
            BrowserFunc.setOption('unpSaveFormat', vm.saveFormat);
            BrowserFunc.setOption('unpFilename', vm.filename);
            BrowserFunc.setOption('unpTxtFormat', vm.txtFormat);
            BrowserFunc.setOption('unpSongMaxLen', vm.songMaxlen);
            BrowserFunc.setOption('unpSongMaxLenApp', vm.songMaxlenAppend);
            BrowserFunc.setOption('unpAlbumArtwork', vm.albumArtwork);
            BrowserFunc.setOption('unpDisableYoutube', vm.disableYoutube);
            BrowserFunc.setOption('unpAutoClear', vm.autoClear);
            BrowserFunc.setOption('unpNotification', vm.browserNotification);

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
        return BrowserFunc.writeFile({
            filename: testFilename,
            text: 'Just a quick test to ensure we can write to this directory! :)'
        }).then(() => {
            BrowserFunc.removeFile(testFilename);
        }).catch(() => {
            $translate('err_directory_inaccess').then((msg) => {
                vm.messageType = 'error';
                vm.message = $sce.trustAsHtml(msg);
            });
            return Promise.reject();
        });
    }
});
