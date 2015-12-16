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
            <input ng-switch-when="input" id="{{::vm.unpTitleKey}}" type="text" ng-model="vm.unpOption"></input>
            <select ng-switch-when="select" id="{{::vm.unpTitleKey}}" ng-model="vm.unpOption" ng-transclude></select>
            <input ng-switch-when="checkbox" id="{{::vm.unpTitleKey}}" type="checkbox" ng-model="vm.unpOption"></input>
            <div ng-switch-default ng-transclude></div>
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
                const elm = angular.element('<div/>');
                elm.append(angular.element('<div/>').addClass('arrow'));
                const content = angular.element('<div/>').addClass('content');
                elm.append(content);
                elm.addClass('popover');
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
                        $element.parent().parent().parent().prepend(elm);
                        const top = offset.top - elm.outerHeight();
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
    });
