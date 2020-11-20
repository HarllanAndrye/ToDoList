(function () {
    "use strict";

    angular.module('todolist')
        .config(routes)
        .run(configDefaults);

    routes.$inject = ['$routeProvider'];
    configDefaults.$inject = ['$rootScope'];

    function routes($routeProvider) {
        $routeProvider
            .when('/', {
                redirectTo: '/login'
            })
            .when('/login', {
                templateUrl: 'pages/login.tpl.html',
            })
            .when('/home', {
                templateUrl: 'pages/home.tpl.html',
            })
            .when('/history/:id', {
                templateUrl: 'pages/history.tpl.html',
            })
            .otherwise({
                redirectTo: '/login'
            });
    }

    function configDefaults($rootScope) {
        $rootScope.listaMensagens = [];
    }

})();