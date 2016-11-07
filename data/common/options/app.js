(() => {
    const { Component, h, render } = window.preact;
    const { Router } = window.preactRouter;
    const { createHashHistory } = window.History;
    const i18n = window.UNPI18n;
    const t = i18n.translate;
    const SettingsPage = window.UNPSettingsPage;
    const AboutPage = window.UNPAboutPage;
    const ChangelogPage = window.UNPChangelogPage;
    const ContactPage = window.UNPContactPage;
    const SitesPage = window.UNPSitesPage;

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
                            h(Router, { history: createHashHistory() },
                                h(SettingsPage, { path: '/settings', default: true }),
                                h(AboutPage, { path: '/about' }),
                                h(ChangelogPage, { path: '/changelog' }),
                                h(ContactPage, { path: '/contact' }),
                                h(SitesPage, { path: '/sites' })
                            )
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
                        h('a', { href: '/settings' }, t('nav_options'))
                    ),
                    h('li', { id: 'nav-sites' },
                        h('a', { href: '/sites' }, t('nav_sites'))
                    ),
                    h('li', { id: 'nav-about' },
                        h('a', { href: '/about' }, t('nav_about'))
                    ),
                    h('li', { id: 'nav-changelog' },
                        h('a', { href: '/changelog' }, t('nav_change'))
                    ),
                    h('li', { id: 'nav-contact' },
                        h('a', { href: '/contact' }, t('nav_contact'))
                    )
                )
            )
        );
    };

    render(h(App), document.body);
})();
