(() => {
    const { h } = window.preact;
    const t = window.UNPI18n.translate;
    const Markup = window.preactMarkup;

    const ContactPage = () => (
        h('main', null,
            h('h1', null, t('nav_contact')),
            h('p', null,
                h(Markup, { markup: t('contact_1'), trim: false })
            ),
            t('contact_2') !== 'contact_2' ?
                h('p', null,
                    h(Markup, { markup: t('contact_2'), trim: false })
                ) :
                null
        )
    );

    window.UNPContactPage = ContactPage;
})();
