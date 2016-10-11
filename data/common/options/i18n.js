(() => {
    const locales = { 'en': 'en', 'fr': 'fr', 'zh': 'zh-CN' };
    let translations = {};

    class I18n {
        static translate(key) {
            if (translations[key]) {
                return translations[key];
            } else {
                return key;
            }
        }

        static loadTranslations() {
            try {
                const locale = navigator.language;
                const lang = locales[locale.split('-')[0]] || 'en';
                return I18n._fetchTranslations(lang);
            } catch (err) {
                return I18n._fetchTranslations('en');
            }
        }

        static _fetchTranslations(locale) {
            return fetch(`translations/${locale}.json`)
                .then(res => res.json())
                .then(json => {
                    translations = json;
                });
        }
    }

    window.UNPI18n = I18n;
})();
