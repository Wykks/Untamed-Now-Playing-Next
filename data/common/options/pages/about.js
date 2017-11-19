(() => {
    const { h } = window.preact;
    const t = window.UNPI18n.translate;
    const Markup = window.preactMarkup;

    const AboutPage = () => (
        h('main', null,
            h('h1', null, t('nav_about')),
            h('p', null, t('about_des')),
            h('h3', null, t('about_limi')),
            h('p', null, t('about_limi_1')),
            h('p', null, t('about_limi_2')),
            h('h3', null, t('about_license')),
            h('p', null,
                h(Markup, { markup: t('about_license_1'), trim: false })
            ),
            h('p', null, t('about_license_2')),
            h('ul', null,
                h('li', null,
                    h('a', { target: '_blank', href: 'http://jquery.com' }, 'jQuery'),
                    ' (MIT License)'
                ),
                h('li', null,
                    h('a', { target: '_blank', href: 'https://preactjs.com/' }, 'Preact'),
                    ' (MIT License)'
                )
            ),
            h('p', null,
                h(Markup, { markup: t('about_license_3'), trim: false })
            ),
            h('div', null,
                'Icons made by ',
                h('a', { href: 'http://www.freepik.com', title: 'Freepik' }, 'Freepik'),
                ' from ',
                h('a', { href: 'http://www.flaticon.com', title: 'Flaticon' }, 'www.flaticon.com'),
                ' is licensed by ',
                h('a', { href: 'http://creativecommons.org/licenses/by/3.0/', title: 'Creative Commons BY 3.0' }, 'CC BY 3.0')
            )
        )
    );

    window.UNPAboutPage = AboutPage;
})();
