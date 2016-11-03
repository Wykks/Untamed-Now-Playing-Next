(() => {
    const { h } = window.preact;
    const t = window.UNPI18n.translate;

    const AboutPage = () => (
        h('main', null,
            h('h1', null, t('nav_about')),
            h('p', null, t('about_des')),
            h('h3', null, t('about_limi')),
            h('p', null, t('about_limi_1')),
            h('p', null, t('about_limi_2')),
            h('h3', null, t('about_license')),
            h('p', { dangerouslySetInnerHTML: { __html: t('about_license_1') } }),
            h('p', null,
                h('a', { rel: 'license', href: 'http://creativecommons.org/licenses/by-sa/3.0/deed' },
                    h('img', { alt: 'Creative Commons Licence', style: 'border-width:0', src: 'http://i.creativecommons.org/l/by-sa/3.0/88x31.png' })
                )
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
            h('p', { dangerouslySetInnerHTML: { __html: t('about_license_3') } }),
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
