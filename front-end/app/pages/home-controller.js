(function () {
    //"use strict";
    "'use strict';\n";

    angular.module('todolist')
        .controller('HomeController', homeController);

    homeController.$inject = ['$scope', 'dragulaService', 'TodoListService', 'helperFactory', '$window'];

    function homeController($scope, dragulaService, TodoListService, helper, $window) {
        var vm = this;

        vm.show = false;
        vm.init = init;
        vm.taskData = taskData;
        vm.formData = formData;
        vm.logout = logout;

        $scope.todoDragulaModel = [];
        $scope.doingDragulaModel = [];
        $scope.doneDragulaModel = [];
        $scope.blockDragulaModel = [];

        dragulaService.options($scope, 'second-bag', {
            accepts: function (el, target, source,) {
                if (source.id == 'doneID') {
                    return false;
                } else {
                    return true;
                }
            }
        });

        $scope.$on('second-bag.drop', function (e, el, target, source) {
            taskData(e, el, target[0].id, source[0].id);
        });

        function init() {
            return TodoListService.getTodoList()
                .then(tasks);

            function tasks(_tasks) {
                if (_tasks.status == 401) {
                    helper.path('/login');
                } else {
                    var todoList = _tasks.filter(o => o.status == 'TODO');
                    var doingList = _tasks.filter(o => o.status == 'DOING');
                    var doneList = _tasks.filter(o => o.status == 'DONE');
                    var blockList = _tasks.filter(o => o.status == 'BLOCK');

                    $scope.todoDragulaModel = todoList;
                    $scope.doingDragulaModel = doingList;
                    $scope.doneDragulaModel = doneList;
                    $scope.blockDragulaModel = blockList;
                }
            }
        }

        function formData() {
            if (typeof vm.form !== 'undefined' && vm.form.name !== '') {
                var param = {
                    "name": vm.form.name
                };

                return TodoListService.insertTodoList(param)
                    .then(response);

                function response(data) {
                    $scope.todoDragulaModel.push(data);
                    vm.form.name = "";
                    vm.show = false;
                }
            }
        }

        /**
         * Aqui chama a service REST API
         * Fazendo um PUT, alterando o status da task
         */
        function taskData(e, el, target_id, source_id) {
            var timeout = 500;
            if (target_id === 'todoID') { //el[0].parentElement.id
                // Tem que esperar um tempo, pois os dados só são preenchido após o drop do elemento.
                setTimeout(() => {
                    var dataToUpdate = $scope.todoDragulaModel.find(o => o.id == el.attr('id'));
                    updateTodoList(dataToUpdate, 'TODO');
                }, timeout);

            } else if (target_id === 'doingID') {
                setTimeout(() => {
                    var dataToUpdate = $scope.doingDragulaModel.find(o => o.id == el.attr('id'));
                    updateTodoList(dataToUpdate, 'DOING');
                }, timeout);

            } else if (target_id === 'doneID') {
                setTimeout(() => {
                    var dataToUpdate = $scope.doneDragulaModel.find(o => o.id == el.attr('id'));
                    updateTodoList(dataToUpdate, 'DONE');
                }, timeout);

            } else if (target_id === 'blockID') {
                setTimeout(() => {
                    var dataToUpdate = $scope.blockDragulaModel.find(o => o.id == el.attr('id'));
                    updateTodoList(dataToUpdate, 'BLOCK');
                }, timeout);

            }
        }

        function updateTodoList(params, status) {
            var dataToUpdate = {
                "id": params.id,
                "name": params.name,
                "status": status
            };

            return TodoListService.updateTodoList(dataToUpdate)
                .then(statusResponse);

            function statusResponse(_status) {
                if (_status == 201) {
                    if (status == 'TODO') {
                        $scope.todoDragulaModel.filter(o => o.id == params.id).map(o => o.status = status);
                    } else if (status == 'DOING') {
                        $scope.doingDragulaModel.filter(o => o.id == params.id).map(o => o.status = status);
                    } else if (status == 'DONE') {
                        $scope.doneDragulaModel.filter(o => o.id == params.id).map(o => o.status = status);
                    } else if (status == 'BLOCK') {
                        $scope.blockDragulaModel.filter(o => o.id == params.id).map(o => o.status = status);
                    }
                } else {
                    helper.addMsg(_status.data.message, 'warning', '');
                }
            }
        }

        function logout() {
            $window.localStorage.setItem('token', '');
            helper.path('/login');
        }
    }

})();