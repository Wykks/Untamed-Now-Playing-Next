(() => {
    const { h } = window.preact;
    const t = window.UNPI18n.translate;

    const ContactPage = () => (
        h('main', null,
            h('h1', null, t('nav_contact')),
            h('p', { dangerouslySetInnerHTML: { __html: t('contact_1') } }),
            t('contact_2') !== 'contact_2' ? h('p', { dangerouslySetInnerHTML: { __html: t('contact_2') } }) : null
        )
    );

    window.UNPContactPage = ContactPage;
})();
