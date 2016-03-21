app.directive('unpOption', ($translate) => {
        return {
            restrict: 'E',
            scope: {
                unpTitleKey: '@',
                unpInfo: '@',
                unpOption: '=',
                unpType: '@'
            },
            controllerAs: 'vm',
            bindToController: true,
            transclude: true,
            controller: function ctrl() {
                const vm = this;

                $translate(vm.unpInfo).then((msg) => {
                    vm.unpInfoButton = msg;
                });
            },
            template: `
        <label for="{{::vm.unpTitleKey}}" translate="{{vm.unpTitleKey}}">
        </label>
        <div class="option-group" ng-switch on="vm.unpType">
            <input ng-switch-when="input" id="{{::vm.unpTitleKey}}" type="text" ng-model="vm.unpOption" ng-trim="false"></input>
            <select ng-switch-when="select" id="{{::vm.unpTitleKey}}" ng-model="vm.unpOption" ng-transclude></select>
            <input ng-switch-when="checkbox" id="{{::vm.unpTitleKey}}" type="checkbox" ng-model="vm.unpOption"></input>
            <div ng-switch-default ng-transclude class="flex-center"></div>
            <unp-info-button unp-info="vm.unpInfoButton"></unp-info-button>
        </div>
        `
        };
    })
    .directive('unpInfoButton', () => {
        return {
            restrict: 'E',
            scope: {
                unpInfo: '=',
            },
            controllerAs: 'vm',
            bindToController: true,
            controller: () => {},
            require: 'unpInfoButton',
            link: ($scope, $element, $attrs, vm) => {
                let added = false;
                const elm = angular.element('<div/>', {
                    class: 'popover'
                });
                elm.append(angular.element('<div/>', {
                    class: 'arrow'
                }));
                const content = angular.element('<div/>', {
                    class: 'content'
                });
                elm.append(content);
                vm.togglePopover = togglePopover;

                function togglePopover() {
                    if (added) {
                        elm.remove();
                        added = false;
                        angular.element('body').off('click', togglePopover);
                    } else {
                        content.html(vm.unpInfo);
                        const offset = angular.element($element).offset();
                        const middleButton = offset.left + (angular.element($element).outerWidth() / 2);
                        $('#container').append(elm);
                        const top = $element[0].offsetTop - elm.outerHeight();
                        const left = middleButton - (elm.outerWidth() / 2);
                        elm.css({
                            top: top + 'px',
                            left: left + 'px',
                            display: 'block'
                        });
                        added = true;
                        angular.element('body').on('click', togglePopover);
                    }
                }
            },
            template: `
        <button class="btn" ng-click="$event.stopPropagation(); vm.togglePopover()">
        <svg id="svg3361" height="16px" width="16px" viewBox="0 0 100 100">
         <g id="layer1" transform="translate(-311.04 -264.13)">
          <path id="path4" d="m391.51 272.4h-60.191c-9.5579 0-17.336 7.791-17.336 17.348v35.215c0 9.558 7.7786 17.339 17.336 17.339h37.755l8.0848 11.575c1.0889 1.5652 2.8744 2.4906 4.7832 2.4943 1.9067 0.004 3.6962-0.91927 4.7954-2.4857l8.4772-12.009c7.791-1.6841 13.653-8.6191 13.653-16.913v-35.215c0-9.5578-7.7971-17.348-17.357-17.348zm-30.091 47.618c2.7921 0 5.0584 2.3141 5.0584 5.1675s-2.2662 5.1627-5.0584 5.1627c-2.7921 0-5.0584-2.3093-5.0584-5.1627s2.2641-5.1675 5.0584-5.1675zm-5.044-8.6779v-21.302c0-2.8546 2.1902-5.1677 5.044-5.1677 2.8559 0 5.044 2.3131 5.044 5.1677v21.302c0 2.8534-2.1881 5.1663-5.044 5.1663-2.8538 0-5.044-2.3153-5.044-5.1663z"/>
         </g>
        </svg>
        </button>
        `
        };
    })
    .directive('unpStatus', ($compile) => {
        return {
            restrict: 'E',
            scope: {
                status: '@',
            },
            controllerAs: 'vm',
            bindToController: true,
            controller: () => {},
            require: 'unpStatus',
            link: ($scope, $element, $attrs, vm) => {
                $element.html(getTemplate(vm.status));
                $compile($element.contents())($scope);
            }
        };

        function getTemplate(status) {
            if (status === 'yes') {
                return '<svg style="enable-background:new 0 0 45.701 45.7" height="16px" width="16px" y="0px" x="0px" viewBox="0 0 45.701 45.7"><path d="m20.687 38.332c-2.072 2.072-5.434 2.072-7.505 0l-11.628-11.628c-2.072-2.071-2.072-5.433 0-7.504 2.071-2.072 5.433-2.072 7.505 0l6.928 6.927c0.523 0.522 1.372 0.522 1.896 0l18.759-18.759c2.071-2.072 5.433-2.072 7.505 0 0.995 0.995 1.554 2.345 1.554 3.752s-0.559 2.757-1.554 3.752l-23.46 23.46z"/></svg>';
            }
            if (status === 'no') {
                return '<svg style="enable-background:new 0 0 41.756 41.756" height="16px" width="16px" y="0px" x="0px" viewBox="0 0 41.756 41.756"><path d="m27.948 20.878l12.343-12.342c1.953-1.953 1.953-5.119 0-7.071-1.951-1.952-5.119-1.952-7.07 0l-12.343 12.344-12.343-12.344c-1.951-1.952-5.119-1.952-7.07 0-1.953 1.953-1.953 5.119 0 7.071l12.342 12.342-12.342 12.342c-1.953 1.953-1.953 5.119 0 7.071 0.975 0.977 2.256 1.464 3.535 1.464 1.278 0 2.56-0.487 3.535-1.464l12.343-12.342 12.343 12.343c0.976 0.977 2.256 1.464 3.535 1.464s2.56-0.487 3.535-1.464c1.953-1.953 1.953-5.119 0-7.071l-12.343-12.343z"/></svg>';
            }
            return '<svg style="enable-background:new 0 0 45.667 45.667" height="16px" width="16px" y="0px" x="0px" viewBox="0 0 45.667 45.667"><path d="m44.188 37.125l-8.623-8.52c-0.869 1.396-1.903 2.705-3.098 3.896-1.205 1.206-2.527 2.251-3.939 3.126l8.673 8.569c1.944 1.923 5.071 1.906 7.004-0.024 0.008-0.008 0.015-0.015 0.022-0.021 1.94-1.941 1.914-5.096-0.039-7.026z"/><path d="m34.385 17.229c0-9.48-7.712-17.192-17.193-17.192-4.739-0.001-9.037 1.928-12.15 5.041s-5.042 7.411-5.042 12.151c0.001 9.479 7.713 17.192 17.192 17.192 4.74 0 9.039-1.928 12.151-5.042 3.114-3.113 5.042-7.41 5.042-12.15zm-9.726 7.466c-1.913 1.912-4.555 3.098-7.466 3.098-5.825 0-10.564-4.738-10.564-10.564 0-2.912 1.185-5.553 3.098-7.466 1.912-1.913 4.554-3.097 7.467-3.098 5.823 0 10.563 4.739 10.563 10.563 0 2.913-1.185 5.554-3.098 7.467z"/></svg>';
        }
    });
