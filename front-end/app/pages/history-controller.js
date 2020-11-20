(function () {
    "use strict";

    angular.module('todolist')
        .controller('HistoryController', historyController);

    historyController.$inject = ['$routeParams', 'TodoListService', 'helperFactory'];

    function historyController($routeParams, service, helper) {
        var vm = this;

        vm.init = init;
        vm.goHome = goHome;
        vm.descriptionTask = '';

        function init() {
            var historyDesc = helper.getRootScope('historyDescription');
            if (historyDesc) {
                vm.descriptionTask = historyDesc;
            }
            
            return service.getHistoryTask($routeParams.id)
                .then(function (response) {
                    if (response.status == 401) {
                        helper.path('/login');
                    } else {
                        vm.taskStatus = response
                    }
                });
        }

        function goHome() {
            helper.setRootScope('historyDescription', '');
            helper.path('/home');
        }
    }

})();