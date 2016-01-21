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
        <svg style="enable-background:new 0 0 46.182 46.182" height="16px" viewBox="0 0 46.182 46.182" width="16px" y="0px" x="0px">
        <path d="m37.734 2.655h-29.296c-4.652 0-8.438 3.792-8.438 8.444v17.14c0 4.652 3.786 8.439 8.438 8.439h18.376l3.935 5.634c0.53 0.762 1.399 1.212 2.328 1.214 0.928 0.002 1.799-0.45 2.334-1.21l4.126-5.845c3.792-0.82 6.645-4.195 6.645-8.232v-17.14c0-4.652-3.795-8.444-8.448-8.444zm-14.643 23.171c1.359 0 2.462 1.126 2.462 2.515s-1.103 2.513-2.462 2.513c-1.359 0-2.462-1.124-2.462-2.513s1.102-2.515 2.462-2.515zm-2.455-4.224v-10.368c0-1.389 1.066-2.515 2.455-2.515 1.39 0 2.455 1.126 2.455 2.515v10.368c0 1.389-1.065 2.515-2.455 2.515-1.389 0-2.455-1.127-2.455-2.515z"/>
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
                return `<svg style="enable-background:new 0 0 45.701 45.7" height="16px" width="16px" y="0px" x="0px" viewBox="0 0 45.701 45.7"><path d="m20.687 38.332c-2.072 2.072-5.434 2.072-7.505 0l-11.628-11.628c-2.072-2.071-2.072-5.433 0-7.504 2.071-2.072 5.433-2.072 7.505 0l6.928 6.927c0.523 0.522 1.372 0.522 1.896 0l18.759-18.759c2.071-2.072 5.433-2.072 7.505 0 0.995 0.995 1.554 2.345 1.554 3.752s-0.559 2.757-1.554 3.752l-23.46 23.46z"/></svg>`;
            }
            if (status === 'no') {
                return `<svg style="enable-background:new 0 0 41.756 41.756" height="16px" width="16px" y="0px" x="0px" viewBox="0 0 41.756 41.756"><path d="m27.948 20.878l12.343-12.342c1.953-1.953 1.953-5.119 0-7.071-1.951-1.952-5.119-1.952-7.07 0l-12.343 12.344-12.343-12.344c-1.951-1.952-5.119-1.952-7.07 0-1.953 1.953-1.953 5.119 0 7.071l12.342 12.342-12.342 12.342c-1.953 1.953-1.953 5.119 0 7.071 0.975 0.977 2.256 1.464 3.535 1.464 1.278 0 2.56-0.487 3.535-1.464l12.343-12.342 12.343 12.343c0.976 0.977 2.256 1.464 3.535 1.464s2.56-0.487 3.535-1.464c1.953-1.953 1.953-5.119 0-7.071l-12.343-12.343z"/></svg>`;
            }
            if (status === 'maybe') {
                return `<svg style="enable-background:new 0 0 45.667 45.667" height="16px" width="16px" y="0px" x="0px" viewBox="0 0 45.667 45.667"><path d="m44.188 37.125l-8.623-8.52c-0.869 1.396-1.903 2.705-3.098 3.896-1.205 1.206-2.527 2.251-3.939 3.126l8.673 8.569c1.944 1.923 5.071 1.906 7.004-0.024 0.008-0.008 0.015-0.015 0.022-0.021 1.94-1.941 1.914-5.096-0.039-7.026z"/><path d="m34.385 17.229c0-9.48-7.712-17.192-17.193-17.192-4.739-0.001-9.037 1.928-12.15 5.041s-5.042 7.411-5.042 12.151c0.001 9.479 7.713 17.192 17.192 17.192 4.74 0 9.039-1.928 12.151-5.042 3.114-3.113 5.042-7.41 5.042-12.15zm-9.726 7.466c-1.913 1.912-4.555 3.098-7.466 3.098-5.825 0-10.564-4.738-10.564-10.564 0-2.912 1.185-5.553 3.098-7.466 1.912-1.913 4.554-3.097 7.467-3.098 5.823 0 10.563 4.739 10.563 10.563 0 2.913-1.185 5.554-3.098 7.467z"/></svg>`;
            }
        }
    });
