(() => {
    const { Component, h } = window.preact;
    const BrowserFunce = window.UNPBrowserFunc;
    const t = window.UNPI18n.translate;

    class SettingsPage extends Component {
        componentDidMount() {
            BrowserFunce.getOptions().then((options) => {
                this.setState({ options });
            });
        }

        render() {
            if (!this.state.options) {
                return (
                    h('div', null, '')
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
                    t('opt_donate_2') !== 'opt_donate_2' ? h('p', { dangerouslySetInnerHTML: { __html: t('opt_donate_2') } }) : null,
                    h('form', { class: 'options' },
                        h('p', null, this._getConfigValue('unpSaveDir'))
                    ),
                    h('p', { class: 'save' },
                        h('button', { class: 'save-btn', type: 'button', onClick: this.onSave.bind(this) }, t('save'))
                    )
                )
            );
        }

        onSave() {
            this.setState({
                message: {
                    type: 'success',
                    text: t('opt_saved')
                }
            });
        }

        _getConfigValue(key, defaultVal) {
            const val = this.state.options[key];
            return val ? val : defaultVal;
        }

        _getConfigBool(key, defaultVal) {
            const val = this.state.options[key];
            return (val !== undefined) ? val : defaultVal;
        }
    }

    window.UNPSettingsPage = SettingsPage;
})();
