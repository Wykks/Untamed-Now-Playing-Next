(() => {
    const { h, Component } = window.preact;
    const t = window.UNPI18n.translate;

    class Header extends Component {
        constructor(props) {
            super(props);
            this.state = { pathname: this.props.history.location.pathname };
            this.props.history.listen((location) => {
                this.setState({
                    pathname: location.pathname
                });
            });
        }

        render() {
            const pathname = this.state.pathname;

            return h('header', null,
                h('a', { class: 'unp-title' },
                    h('strong', null, t('extention_name') + ' '),
                    h('small', null, this.props.version)
                ),
                h('nav', null,
                    h('ul', { id: 'menu' },
                        h('li', { id: 'nav-options', class: pathname === '/settings' ? 'active' : null },
                            h('a', { href: '/settings' }, t('nav_options'))
                        ),
                        h('li', { id: 'nav-sites', class: pathname === '/sites' ? 'active' : null  },
                            h('a', { href: '/sites' }, t('nav_sites'))
                        ),
                        h('li', { id: 'nav-about', class: pathname === '/about' ? 'active' : null  },
                            h('a', { href: '/about' }, t('nav_about'))
                        ),
                        h('li', { id: 'nav-changelog', class: pathname === '/changelog' ? 'active' : null  },
                            h('a', { href: '/changelog' }, t('nav_change'))
                        ),
                        h('li', { id: 'nav-contact', class: pathname === '/contact' ? 'active' : null  },
                            h('a', { href: '/contact' }, t('nav_contact'))
                        )
                    )
                )
            );
        }
    }

    window.UNPHeaderComponent = Header;
})();

