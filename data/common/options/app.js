(() => {
    const { Component, h, render } = window.preact;
    const { Router } = window.preactRouter;
    const { createHashHistory } = window.History;
    const i18n = window.UNPI18n;
    const SettingsPage = window.UNPSettingsPage;
    const AboutPage = window.UNPAboutPage;
    const ChangelogPage = window.UNPChangelogPage;
    const ContactPage = window.UNPContactPage;
    const SitesPage = window.UNPSitesPage;
    const HeaderComponent = window.UNPHeaderComponent;

    class App extends Component {
        componentDidMount() {
            i18n.loadTranslations().then(() => {
                this.setState({
                    ready: true,
                    history: createHashHistory()
                });
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
                    h(HeaderComponent, { version: 'v4.7.2', history: this.state.history }),
                    h('div', { id: 'container' },
                        h('div', { id: 'main-content' },
                            h(Router, { history: this.state.history },
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

    render(h(App), document.getElementById('root'));
})();
