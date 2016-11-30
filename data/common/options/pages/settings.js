(() => {
    const { Component, h } = window.preact;
    const BrowserFunc = window.UNPBrowserFunc;
    const t = window.UNPI18n.translate;
    const SettingsFormComponent = window.UNPSettingsFormComponent;

    class SettingsPage extends Component {
        constructor() {
            super();
            this.handleSubmit = this.handleSubmit.bind(this);
        }

        componentDidMount() {
            BrowserFunc.getOptions().then((options) => {
                let saveDir;
                let message;
                if (options.unpSaveDir !== undefined) {
                    saveDir = options.unpSaveDir;
                } else {
                    message = {
                        type: 'warn',
                        text: t('warn_opt')
                    };
                    if (BrowserFunc.getPlatform() === 'winnt')
                        saveDir = 'C:\\Users\\USERNAME\\Documents\\unp\\';
                    else if (BrowserFunc.getPlatform() === 'linux')
                        saveDir = '/home/USERNAME/unp/';
                }
                this.setState({
                    options: {
                        saveDir,
                        filename: this._getConfigValue(options.unpFilename, 'unp_now_playing'),
                        txtFormat: this._getConfigValue(options.unpTxtFormat, '%s%'),
                        saveFormat: this._getConfigValue(options.unpSaveFormat, 'txt'),
                        songMaxlen: this._getConfigValue(options.unpSongMaxLen, 60),
                        songMaxlenAppend: this._getConfigBool(options.unpSongMaxLenApp, true),
                        albumArtwork: this._getConfigBool(options.unpAlbumArtwork, true),
                        disableYoutube: this._getConfigBool(options.unpDisableYoutube, false),
                        autoClear: this._getConfigBool(options.unpAutoClear, false),
                        noMusicMessage: this._getConfigValue(options.unpNoMusicMessage, ''),
                        browserNotification: this._getConfigBool(options.unpNotification, true)
                    },
                    isSaving: false,
                    message
                });
            });
        }

        handleSubmit(options) {
            this.setState({ isSaving: true });
            if (BrowserFunc.getPlatform() === 'winnt') {
                options.saveDir = options.saveDir.split('/').join('\\');
                if (options.saveDir.substr(options.saveDir.length - 1) != '\\') {
                    options.saveDir = options.saveDir + '\\';
                }
            } else {
                if (options.saveDir.substr(options.saveDir.length - 1) != '/') {
                    options.saveDir = options.saveDir + '/';
                }
            }
            this._validateOptions(options).then(() => {
                BrowserFunc.setOption('unpSaveDir', options.saveDir);
                BrowserFunc.setOption('unpSaveFormat', options.saveFormat);
                BrowserFunc.setOption('unpFilename', options.filename);
                BrowserFunc.setOption('unpTxtFormat', options.txtFormat);
                BrowserFunc.setOption('unpSongMaxLen', options.songMaxlen);
                BrowserFunc.setOption('unpSongMaxLenApp', options.songMaxlenAppend);
                BrowserFunc.setOption('unpAlbumArtwork', options.albumArtwork);
                BrowserFunc.setOption('unpDisableYoutube', options.disableYoutube);
                BrowserFunc.setOption('unpAutoClear', options.autoClear);
                BrowserFunc.setOption('unpNoMusicMessage', options.noMusicMessage);
                BrowserFunc.setOption('unpNotification', options.browserNotification);
                this.setState({
                    message: {
                        type: 'success',
                        text: t('opt_saved')
                    },
                    isSaving: false
                });
            }).catch((errorMessage) => {
                this.setState({
                    message: {
                        type: 'error',
                        text: errorMessage
                    },
                    isSaving: false
                });
            });

        }

        _validateOptions(options) {
            if (options.saveDir.indexOf('windows') !== -1) {
                return Promise.reject(t('err_directory_win'));
            }

            const testFilename = options.saveDir + options.filename + '_write_test_53642784162133643354.txt';
            return BrowserFunc.createDirIfNotExists({
                directory: options.saveDir
            }).then(() => {
                return BrowserFunc.writeFile({
                    filename: testFilename,
                    text: 'Just a quick test to ensure we can write to this directory! :)'
                });
            }).then(() => {
                BrowserFunc.removeFile(testFilename);
            }).catch((reason) => {
                return Promise.reject(`${t('err_directory_inaccess')} (${reason}`);
            });
        }

        _getConfigValue(val, defaultVal) {
            return val ? val : defaultVal;
        }

        _getConfigBool(val, defaultVal) {
            return (val !== undefined) ? val : defaultVal;
        }

        render() {
            if (!this.state.options) {
                return (
                    h('main')
                );
            }
            let message;
            if (this.state.message) {
                message = h('div', {
                    class: `alert alert-${this.state.message.type}`,
                    dangerouslySetInnerHTML: { __html: this.state.message.text }
                });
            }
            return (
                h('main', null,
                    h('h1', null, t('nav_options')),
                    h('p', null, t('opt_des')),
                    h('p', { dangerouslySetInnerHTML: { __html: t('opt_donate') } }),
                    message,
                    t('opt_donate_2') !== 'opt_donate_2' ?
                        h('p', { dangerouslySetInnerHTML: { __html: t('opt_donate_2') } }) :
                        null,
                    h(SettingsFormComponent,
                        Object.assign({
                            onSubmit: this.handleSubmit,
                            isSaving: this.state.isSaving
                        }, this.state.options)
                    )
                )
            );
        }
    }

    window.UNPSettingsPage = SettingsPage;
})();
