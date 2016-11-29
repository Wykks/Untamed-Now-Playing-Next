(() => {
    const { Component, h } = window.preact;
    const t = window.UNPI18n.translate;

    class ChangelogPage extends Component {
        componentDidMount() {
            fetch('changelog.json')
                .then(res => res.json())
                .then(changelog => {
                    this.setState({ changelog });
                });
        }

        render() {
            if (!this.state.changelog) {
                return (
                    h('main')
                );
            }

            return (
                h.apply(null, ['main', null,
                    h('h1', null, t('nav_change')),
                    ...Object.keys(this.state.changelog)
                        .map((version) => h(changeElement, { version, changes: this.state.changelog[version] }))
                ])
            );

        }
    }

    const changeElement = ({ version, changes }) => {
        return h('div', null,
            h('h4', null, `${version} - ${changes.date}`),
            h.apply(null, ['ul', null,
                changes.added ? h(subChange, { type: 'Added', changes: changes.added }) : null,
                changes.fixed ? h(subChange, { type: 'Fixed', changes: changes.fixed }) : null,
                changes.removed ? h(subChange, { type: 'Removed', changes: changes.removed }) : null,
                ...(changes.other ? changes.other.map((other) => h('li', null, other)) : [null])
            ])
        );
    };

    const subChange = ({ type, changes }) => {
        return h('li', null,
            `${type}:`,
            h.apply(null, ['ul', null,
                ...changes.map((change) => h('li', null, change))
            ])
        );
    };

    window.UNPChangelogPage = ChangelogPage;
})();
