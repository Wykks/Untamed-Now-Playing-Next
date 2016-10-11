(() => {
    const { Component, h, render } = window.preact;
    const i18n = window.UNPI18n;
    const t = i18n.translate;
    const SettingsPage = window.UNPSettingsPage;

    class App extends Component {
        componentDidMount() {
            i18n.loadTranslations().then(() => {
                this.setState({ ready: true });
            });
        }

        render() {
            if (!this.state.ready) {
                return (
                    h('div', null, '')
                );
            }
            return (
                h('div', { id: 'app' },
                    h(Header, { version: 'v4.0' }),
                    h('div', { id: 'container' },
                        h('div', { id: 'main-content' },
                        h(SettingsPage)
                        )
                    )
                )
            );
        }
    }

    const Header = ({version}) => {
        return h('header', null,
            h('a', { class: 'unp-title' },
                h('strong', null, t('extention_name') + ' '),
                h('small', null, version)
            ),
            h('nav', null,
                h('ul', { id: 'menu' },
                    h('li', { id: 'nav-options' },
                        h('a', null, t('nav_options'))
                    ),
                    h('li', { id: 'nav-sites' },
                        h('a', null, t('nav_sites'))
                    ),
                    h('li', { id: 'nav-about' },
                        h('a', null, t('nav_about'))
                    ),
                    h('li', { id: 'nav-changelog' },
                        h('a', null, t('nav_change'))
                    ),
                    h('li', { id: 'nav-contact' },
                        h('a', null, t('nav_contact'))
                    )
                )
            )
        );
    };

    render(h(App), document.body);
})();
