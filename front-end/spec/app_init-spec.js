(function () {

    angular.mock.todolistMock = function ($routeProvider) {
        module('todolist');
        module(function ($provide) {
            $provide.service('TodoListService', function () {
                return {
                    exemplo: function () { return {}; },
                };
            });
        });
    };

}());
