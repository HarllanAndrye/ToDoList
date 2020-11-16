(function () {
    "use strict";

    angular.module('todolist')
        .service('TodoListService', todoListService);

        todoListService.$inject = ['$http', '$base64'];

    function todoListService($http, Base64) {
        var URL_BASE = 'http://localhost:8080/restapi/todolist';

        // Para a autenticação do back-end
        var username = "teste@email.com";
        var password = "123456"
        var auth = Base64.encode(username + ':' + password);
        $http.defaults.headers.common['Authorization'] = 'Basic ' + auth;

        return {
            getTodoList: getTodoList,
            insertTodoList: insertTodoList,
            updateTodoList: updateTodoList,
            deleteTodoList: deleteTodoList
        }

        function getTodoList() {
            return $http.get(URL_BASE)
                .then(function (response) {
                    return response.data;
                })
                .catch(function (error) {
                    return error;
                });
        }

        function insertTodoList(_param) {
            return $http.post(URL_BASE + '/insert', _param)
                .then(function (response) {
                    return response.data;
                })
                .catch(function (error) {
                    return error;
                });
        }

        function updateTodoList(_param) {
            var param = {
                "name": _param.name,
                "status": _param.status
            };

            return $http.put(URL_BASE + '/update/' + _param.id, param)
                .then(function (response) {
                    //return response.data;
                    return response.status;
                })
                .catch(function (error) {
                    return error;
                });
        }

        function deleteTodoList(_id) {
            return $http.delete(URL_BASE + '/delete/' + _id)
                .then(function (response) {
                    return response.data;
                })
                .catch(function (error) {
                    return error;
                });
        }
    }
})();