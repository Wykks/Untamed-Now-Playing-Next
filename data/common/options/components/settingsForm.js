(() => {
    const { Component, h } = window.preact;
    const t = window.UNPI18n.translate;
    const InfoButtonComponent = window.UNPInfoButtonComponent;

    class SettingsForm extends Component {
        constructor(props) {
            super(props);
            this.onSubmit = this.onSubmit.bind(this);
            const st = Object.assign({}, this.props);
            delete st.onSubmit;
            this.setState(st);
        }

        onSubmit() {
            this.props.onSubmit(this.state);
        }

        render() {
            return h('form', { class: 'options', onSubmit: this.onSubmit },
                h('div', { class: 'option-form-content' },
                    h(formOption, {
                        title: t('opt_0'),
                        value: this.state.saveDir,
                        onChange: this.linkState('saveDir'),
                        type: 'input',
                        tooltip: t('opt_tt_0')
                    }),
                    h(formOption, {
                        title: t('opt_1'),
                        value: this.state.saveFormat,
                        onChange: this.linkState('saveFormat'),
                        type: 'select',
                        tooltip: t('opt_tt_1')
                    },
                        h('option', { value: 'txt' }, t('opt_1_select_txt')),
                        h('option', { value: 'json' }, t('opt_1_select_json')),
                        h('option', { value: 'xml' }, t('opt_1_select_xml')),
                        h('option', { value: 'multi' }, t('opt_1_select_multi'))
                    ),
                    this.state.saveFormat !== 'multi' ? h(formOption, {
                        title: t('opt_2'),
                        value: this.state.filename,
                        onChange: this.linkState('filename'),
                        type: 'input',
                        tooltip: t('opt_tt_2')
                    }) : null,
                    this.state.saveFormat === 'txt' ? h(formOption, {
                        title: t('opt_3'),
                        value: this.state.txtFormat,
                        onChange: this.linkState('txtFormat'),
                        type: 'input',
                        tooltip: t('opt_tt_3')
                    }) : null,
                    h(formOption, { title: t('opt_4'), tooltip: t('opt_tt_4') },
                        h('input', {
                            type: 'number',
                            min: 10,
                            max: 256,
                            value: this.state.songMaxlen,
                            onChange: this.linkState('songMaxlen')
                        }),
                        h('div', { class: 'checkbox' },
                            h('input', {
                                type: 'checkbox',
                                checked: this.state.songMaxlenAppend,
                                onChange: this.linkState('songMaxlenAppend')
                            }),
                            h('span', null, t('opt_4_des'))
                        )
                    ),
                    h(formOption, {
                        title: t('opt_5'),
                        value: this.state.albumArtwork,
                        onChange: this.linkState('albumArtwork'),
                        type: 'checkbox',
                        tooltip: t('opt_tt_5')
                    }),
                    h(formOption, {
                        title: t('opt_6'),
                        value: this.state.disableYoutube,
                        onChange: this.linkState('disableYoutube'),
                        type: 'checkbox',
                        tooltip: t('opt_tt_6')
                    }),
                    h(formOption, {
                        title: t('opt_11'),
                        value: this.state.autoClear,
                        onChange: this.linkState('autoClear'),
                        type: 'checkbox',
                        tooltip: t('opt_tt_11')
                    }),
                    this.state.autoClear ? h(formOption, {
                        title: t('opt_13'),
                        value: this.state.noMusicMessage,
                        onChange: this.linkState('noMusicMessage'),
                        type: 'input',
                        tooltip: t('opt_tt_13')
                    }) : null,
                    h(formOption, {
                        title: t('opt_12'),
                        value: this.state.browserNotification,
                        onChange: this.linkState('browserNotification'),
                        type: 'checkbox',
                        tooltip: t('opt_tt_12')
                    })
                ),
                h('p', { class: 'save' },
                    h('input', {
                        class: 'save-btn',
                        type: 'submit',
                        disabled: this.props.isSaving,
                        value: t('save')
                    })
                )
            );
        }
    }

    const formOption = ({ title, value, onChange, type, tooltip, children }) => {
        let content;
        switch (type) {
            case 'input':
                content = h('input', { id: title, type: 'text', value, onChange });
                break;
            case 'select':
                content = h('select', { id: title, value, onChange }, children);
                break;
            case 'checkbox':
                content = h('input', { id: title, type: 'checkbox', checked: value, onChange });
                break;
            default:
                content = h('div', { class: 'flex-center' }, children);
        }
        return h('div', { class: 'unp-option' },
            h('label', { for: title }, title),
            h('div', { class: 'option-group' },
                content,
                h(InfoButtonComponent, { msg: tooltip })
            )
        );
    };

    window.UNPSettingsFormComponent = SettingsForm;
})();


