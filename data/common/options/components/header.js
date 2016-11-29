(() => {
    const { h } = window.preact;
    const t = window.UNPI18n.translate;

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

    window.UNPHeaderComponent = Header;
})();

