(() => {
    const { Component, h, render } = window.preact;
    const Markup = window.preactMarkup;
    const jQuery = window.jQuery;
    const Nothing = () => null;

    class InfoButtonComponent extends Component {
        constructor(props) {
            super(props);
            this.onClick = this.onClick.bind(this);
            this._onClickOutside = this._toggleTooltip.bind(this);
        }

        componentDidMount() {
            this.tooltipElement = window.document.createElement('div');
            this.tooltipElement.className = 'popover';
            this.tooltipElement.innerHTML = `
                <div class="arrow"></div>
                <div class="content"></div>
            `;
            this.tooltipContent = this.tooltipElement.querySelector('.content');
            this.tooltipElement = jQuery(this.tooltipElement);
        }

        onClick(event) {
            event.preventDefault();
            event.stopPropagation();
            this._toggleTooltip();
        }

        _toggleTooltip() {
            if (this.isTooltipOpen) {
                render(h(Nothing), this.tooltipContent, this.renderedContent);
                this.tooltipElement.remove();
                this.isTooltipOpen = false;
                jQuery('body').off('click', this._onClickOutside);
            } else {
                this.renderedContent = render(h(Markup, { markup: this.props.msg, trim: false }), this.tooltipContent);
                const offset = jQuery(this.base).offset();
                const middleButton = offset.left + (jQuery(this.base).outerWidth() / 2);
                jQuery('#container').append(this.tooltipElement);
                const top = this.base.offsetTop - jQuery(this.tooltipElement).outerHeight();
                const left = middleButton - (this.tooltipElement.outerWidth() / 2);
                this.tooltipElement.css({
                    top: top + 'px',
                    left: left + 'px',
                    display: 'block'
                });
                this.isTooltipOpen = true;
                jQuery('body').on('click', this._onClickOutside);
            }
        }

        render() {
            return h('button', { class: 'btn', onClick: this.onClick },
                h('svg', {
                    height: '16px', width: '16px',
                    viewBox: '0 0 100 100'
                },
                    h('g', { transform: 'translate(-311.04 -264.13)' },
                        h('path', {
                            d: 'm391.51 272.4h-60.191c-9.5579 0-17.336 7.791-17.336 17.348v35.215c0 9.558 7.7786 17.339 17.336 17.339h37.755l8.0848 11.575c1.0889 1.5652 2.8744 2.4906 4.7832 2.4943 1.9067 0.004 3.6962-0.91927 4.7954-2.4857l8.4772-12.009c7.791-1.6841 13.653-8.6191 13.653-16.913v-35.215c0-9.5578-7.7971-17.348-17.357-17.348zm-30.091 47.618c2.7921 0 5.0584 2.3141 5.0584 5.1675s-2.2662 5.1627-5.0584 5.1627c-2.7921 0-5.0584-2.3093-5.0584-5.1627s2.2641-5.1675 5.0584-5.1675zm-5.044-8.6779v-21.302c0-2.8546 2.1902-5.1677 5.044-5.1677 2.8559 0 5.044 2.3131 5.044 5.1677v21.302c0 2.8534-2.1881 5.1663-5.044 5.1663-2.8538 0-5.044-2.3153-5.044-5.1663z'
                        })
                    )
                )
            );
        }
    }

    window.UNPInfoButtonComponent = InfoButtonComponent;
})();
