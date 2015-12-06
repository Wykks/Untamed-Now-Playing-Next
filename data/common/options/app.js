const app = angular.module('UNP', ['ngRoute', 'pascalprecht.translate']);

BrowserFunc.setup().then(({
    storageFactory
}) => {
    app.factory('Storage', storageFactory);
    angular.bootstrap(document, ['UNP']);
});

app.run(($rootScope, $translate) => {
    $rootScope.VERSION = 'v3.0-dev';
    $translate('extention_name').then((name) => {
        $rootScope.PAGE_TITLE = `${name} ${$rootScope.VERSION} - Options`;
    });
});

app.config(($routeProvider, $translateProvider) => {
    $routeProvider
        .when('/settings', {
            templateUrl: 'pages/settings.html',
            controller: 'SettingsCtrl as vm'
        })
        .when('/sites', {
            templateUrl: 'pages/sites.html',
            controller: 'SiteCtrl as vm'
        })
        .when('/about', {
            templateUrl: 'pages/about.html'
        })
        .when('/changelog', {
            templateUrl: 'pages/changelog.html',
            controller: 'ChangelogCtrl as vm'
        })
        .when('/contact', {
            templateUrl: 'pages/contact.html'
        })
        .otherwise({
            redirectTo: '/settings'
        });

    $translateProvider
        .useStaticFilesLoader({
            prefix: 'translations/',
            suffix: '.json'
        })
        .registerAvailableLanguageKeys(['fr', 'fr_FR', 'en', 'en_GB', 'en_US', 'zh-CN'], {
            'en_*': 'en',
            'fr_*': 'fr'
        })
        .fallbackLanguage('en')
        .determinePreferredLanguage();
});

app.controller('NavCtrl', function NavCtrl($scope, $location) {
    const vm = this;

    vm.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };
});

app.controller('SiteCtrl', function SiteCtrl() {
    const vm = this;
});

app.controller('ChangelogCtrl', function ChangelogCtrl() {
    const vm = this;
});
