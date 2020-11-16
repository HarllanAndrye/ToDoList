(function () {
    "use strict";

    angular.module('todolist')
        .controller('HomeController', homeController);

    homeController.$inject = ['$scope', 'dragulaService', 'TodoListService'];

    function homeController($scope, dragulaService, TodoListService) {
        var vm = this;

        vm.show = false;

        /*dragulaService.options($scope, 'sixth-bag', {
            moves: function (el, container, handle) {
                return handle.className === 'handle';
            }
        });*/
        dragulaService.options($scope, 'second-bag', {
            accepts: function (el, target, source,) {
                if (source.id == 'doneID') {
                    return false;
                } else {
                    return true;
                }
            }
            // Não deixa o elemento ser arrastado
            //invalid: function (el, handle) {
            //    return el.className === 'title-todolist';
            //  }
            //moves: function (el, container, handle) {
            //    return el.className !== 'title-todolist-div';
            //}
        });

        vm.init = init;
        vm.formData = formData;
        //vm.showForm = showForm;

        /*vm.formatDate = formatDate;

        function formatDate(date) {
            var dateOut = new Date(date);
            return dateOut;
        };*/

        /*function showForm() {
            vm.show = !vm.show;
            console.log(vm.show);
        }*/

        //vm.data = [];

        /*vm.data = [
            {
                "dataCriacao": "28/10/2020 20:35",
                "id": 1,
                "nome": "string",
                "status": "TODO"
            },
            {
                "dataCriacao": "28/10/2020 20:36",
                "id": 2,
                "nome": "teste",
                "status": "TODO"
            },
            {
                "dataCriacao": "28/10/2020 20:37",
                "id": 3,
                "nome": "outra",
                "status": "TODO"
            }
        ];*/

        //$scope.todoDragulaModel = vm.data;
        $scope.todoDragulaModel = [];
        $scope.doingDragulaModel = [];
        $scope.doneDragulaModel = [];
        $scope.blockDragulaModel = [];


        $scope.$on('second-bag.drop', function (e, el, target, source) {
            taskData(e, el, target[0].id, source[0].id);
            //el.addClass('ex-moved');
        });


        function init() {
            return TodoListService.getTodoList()
                .then(tasks);

            function tasks(_tasks) {
                //vm.data = _tasks;
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

            //console.log(source_id);

            if (target_id === 'todoID') { //el[0].parentElement.id

                //console.log('Temos tarefa a fazer, ID ' + el.attr('id'));
                // Tem que esperar um tempo, pois os dados só são preenchido após o drop do elemento.
                setTimeout(() => {
                    var dataToUpdate = $scope.todoDragulaModel.find(o => o.id == el.attr('id'));
                    updateTodoList(dataToUpdate, 'TODO');
                }, timeout);

            } else if (target_id === 'doingID') {
                //console.log('Fazendo a tarefa ' + el.attr('id'));
                setTimeout(() => {
                    var dataToUpdate = $scope.doingDragulaModel.find(o => o.id == el.attr('id'));
                    //console.log(dataToUpdate);
                    updateTodoList(dataToUpdate, 'DOING');
                }, timeout);

            } else if (target_id === 'doneID') {

                //console.log('Tarefa feita, oba!!');
                setTimeout(() => {
                    var dataToUpdate = $scope.doneDragulaModel.find(o => o.id == el.attr('id'));
                    updateTodoList(dataToUpdate, 'DONE');
                }, timeout);

            } else if (target_id === 'blockID') {

                //console.log('Tarefa bloqueada.');
                setTimeout(() => {
                    var dataToUpdate = $scope.blockDragulaModel.find(o => o.id == el.attr('id'));
                    updateTodoList(dataToUpdate, 'BLOCK');
                }, timeout);

            }
        }

        function updateTodoList(params, status) {
            //"dataCriacao": params.dataCriacao,
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
                }
            }
        }

        /*$scope.$on('second-bag.drag', function (e, el, source) {
            //console.log('entrou no ON DRAG');
            if (source.attr('id') == 'doneID') {
                console.log('NÃO PODE...');
            }
            //el.removeClass('ex-moved');
        });*/

        /*$scope.$on('second-bag.over', function (e, el, container) {
            //console.log('entrou no ON OVER');
            container.addClass('ex-over');
        });*/

        // TALVEZ PODE SER UTILIZADO
        /*$scope.$on('second-bag.out', function (e, el, container) {
            console.log('entrou no ON OUT');
            console.log(container.attr('id'));
            //container.removeClass('ex-over');
        });*/
    }

})();