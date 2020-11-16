(function () {
    "use strict";

    angular.module('todolist')
        .config(routes);

    routes.$inject = ['$routeProvider'];

    function routes($routeProvider) {
        $routeProvider
            .when('/', {
                redirectTo: '/home'
            })
            .when('/home', {
                templateUrl: 'pages/home.tpl.html',
            })
            .otherwise({
                redirectTo: '/home'
            });
    }

})();