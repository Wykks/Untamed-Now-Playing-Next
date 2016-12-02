(() => {
    const { Component, h } = window.preact;
    const Markup = window.preactMarkup;
    const t = window.UNPI18n.translate;

    const SitesPage = () => (
        h('main', null,
            h('h1', null, t('nav_sites')),
            h('p', null,
                h(Markup, { markup: t('sites_des'), trim: false })
            ),
            h('p', null,
                h(Markup, { markup: t('sites_des_2'), trim: false })
            ),
            h(SitesTable),
            h('small', null, t('sites_note_2')),
            h('p', null,
                h(Markup, { markup: t('sites_des_3'), trim: false })
            ),
            h('h3', null, t('sites_var_list')),
            h('pre', null,
                h('strong', null, '%s%'), ' : ', h('span', null, t('sites_var_s')),
                h('br'),
                h('strong', null, '%a%'), ' : ', h('span', null, t('sites_var_a')),
                h('br'),
                h('strong', null, '%e%'), ' : ', h('span', null, t('sites_var_e')),
                h('br'),
                h('strong', null, '%b%'), ' : ', h('span', null, t('sites_var_b')),
                h('br'),
                h('strong', null, '%d%'), ' : ', h('span', null, t('sites_var_d')),
                h('br'),
                h('strong', null, '%t%'), ' : ', h('span', null, t('sites_var_t')),
                h('br'),
                h('strong', null, '%u%'), ' : ', h('span', null, t('sites_var_u')),
                h('br'),
                h('strong', null, '%n%'), ' : ', h('span', null, t('sites_var_n'))
            ),
            h('h3', null, t('sites_example')),
            h('p', null, t('sites_example_1')),
            h('pre', null, '%a% - %e% (%b%) [%d%]'),
            h('p', null, t('sites_example_2')),
            h('pre', null, 'Artist - Title (Album) [Duration]')
        )
    );

    class SitesTable extends Component {
        componentDidMount() {
            fetch('sites.json')
                .then(res => res.json())
                .then(sites => {
                    this.setState({ sites });
                });
        }

        render() {
            if (!this.state.sites) {
                return (
                    h('table')
                );
            }

            return (
                h('table', { id: 'sites_table', class: 'table table-bordered table-hover table-condensed' },
                    h('thead', null,
                        h('tr', null,
                            h('th', null, ' '),
                            h('th', null, t('sites_th_artist')),
                            h('th', null, t('sites_th_title')),
                            h('th', null, t('sites_th_duration')),
                            h('th', null, t('sites_th_album')),
                            h('th', null, t('sites_th_artwork'))
                        )
                    ),
                    h.apply(null, ['tbody', null,
                        ...Object.keys(this.state.sites)
                            .map((name) => h(SiteRow, { name, site: this.state.sites[name] }))
                    ])
                )
            );
        }
    }

    const SiteRow = ({name, site}) => {
        return h('tr', null,
            h('td', null,
                h('a', { target: '_blank', href: site.url }, name)
            ),
            h(SiteStatus, { status: site.artist }),
            h(SiteStatus, { status: site.title }),
            h(SiteStatus, { status: site.duration }),
            h(SiteStatus, { status: site.album }),
            h(SiteStatus, { status: site.artwork })
        );
    };

    const SiteStatus = ({ status }) => {
        let icon;
        if (status === 'yes') {
            icon = h('svg', {
                style: 'enable-background:new 0 0 45.701 45.7',
                height: '16px', width: '16px',
                y: '0px', x: '0px',
                viewBox: '0 0 45.701 45.7'
            },
                h('path', { d: 'm20.687 38.332c-2.072 2.072-5.434 2.072-7.505 0l-11.628-11.628c-2.072-2.071-2.072-5.433 0-7.504 2.071-2.072 5.433-2.072 7.505 0l6.928 6.927c0.523 0.522 1.372 0.522 1.896 0l18.759-18.759c2.071-2.072 5.433-2.072 7.505 0 0.995 0.995 1.554 2.345 1.554 3.752s-0.559 2.757-1.554 3.752l-23.46 23.46z' })
            );
        } else if (status === 'no') {
            icon = h('svg', {
                style: 'enable-background:new 0 0 41.756 41.756',
                height: '16px', width: '16px',
                y: '0px', x: '0px',
                viewBox: '0 0 41.756 41.756'
            },
                h('path', { d: 'm27.948 20.878l12.343-12.342c1.953-1.953 1.953-5.119 0-7.071-1.951-1.952-5.119-1.952-7.07 0l-12.343 12.344-12.343-12.344c-1.951-1.952-5.119-1.952-7.07 0-1.953 1.953-1.953 5.119 0 7.071l12.342 12.342-12.342 12.342c-1.953 1.953-1.953 5.119 0 7.071 0.975 0.977 2.256 1.464 3.535 1.464 1.278 0 2.56-0.487 3.535-1.464l12.343-12.342 12.343 12.343c0.976 0.977 2.256 1.464 3.535 1.464s2.56-0.487 3.535-1.464c1.953-1.953 1.953-5.119 0-7.071l-12.343-12.343z' })
            );
        } else {
            icon = h('svg', {
                style: 'enable-background:new 0 0 45.667 45.667',
                height: '16px', width: '16px',
                y: '0px', x: '0px',
                viewBox: '0 0 45.667 45.667'
            },
                h('path', { d: 'm44.188 37.125l-8.623-8.52c-0.869 1.396-1.903 2.705-3.098 3.896-1.205 1.206-2.527 2.251-3.939 3.126l8.673 8.569c1.944 1.923 5.071 1.906 7.004-0.024 0.008-0.008 0.015-0.015 0.022-0.021 1.94-1.941 1.914-5.096-0.039-7.026z' }),
                h('path', { d: 'm34.385 17.229c0-9.48-7.712-17.192-17.193-17.192-4.739-0.001-9.037 1.928-12.15 5.041s-5.042 7.411-5.042 12.151c0.001 9.479 7.713 17.192 17.192 17.192 4.74 0 9.039-1.928 12.151-5.042 3.114-3.113 5.042-7.41 5.042-12.15zm-9.726 7.466c-1.913 1.912-4.555 3.098-7.466 3.098-5.825 0-10.564-4.738-10.564-10.564 0-2.912 1.185-5.553 3.098-7.466 1.912-1.913 4.554-3.097 7.467-3.098 5.823 0 10.563 4.739 10.563 10.563 0 2.913-1.185 5.554-3.098 7.467z' })
            );
        }
        return h('td', { class: 'status-icon' }, icon);
    };

    window.UNPSitesPage = SitesPage;
})();
