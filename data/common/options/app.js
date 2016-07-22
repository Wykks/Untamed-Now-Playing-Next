const app = angular.module('UNP', ['ngRoute', 'ngAnimate', 'pascalprecht.translate']);

app.run(($rootScope, $translate) => {
    $rootScope.VERSION = 'v3.4';
    $translate('extention_name').then((name) => {
        $rootScope.PAGE_TITLE = `${name} ${$rootScope.VERSION} - Options`;
    });
});

app.config(($routeProvider, $translateProvider) => {
    $routeProvider
        .when('/settings', {
            templateUrl: 'pages/settings.html',
            controller: 'SettingsCtrl as vm',
            resolve: {
                storage: () => {
                    return window.UNPBrowserFunc.getOptions();
                }
            }
        })
        .when('/sites', {
            templateUrl: 'pages/sites.html',
            controller: 'SiteCtrl as vm',
            resolve: {
                sites: ($http) => {
                    return $http.get('sites.json').then((res) => {
                        return res.data;
                    });
                }
            }
        })
        .when('/about', {
            templateUrl: 'pages/about.html'
        })
        .when('/changelog', {
            templateUrl: 'pages/changelog.html',
            controller: 'ChangelogCtrl as vm',
            resolve: {
                changelog: ($http) => {
                    return $http.get('changelog.json').then((res) => {
                        return res.data;
                    });
                }
            }
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
        .determinePreferredLanguage()
        .fallbackLanguage('en');
});

app.controller('NavCtrl', function NavCtrl($scope, $location) {
    const vm = this;

    vm.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };
});

app.controller('SiteCtrl', function SiteCtrl(sites) {
    const vm = this;

    vm.sites = sites;
});

app.controller('ChangelogCtrl', function ChangelogCtrl(changelog) {
    const vm = this;

    vm.changelog = changelog;
});
