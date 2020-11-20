(function () {
    "use strict";

    angular.module('todolist')
        .service('TodoListService', todoListService);

    todoListService.$inject = ['$http', '$base64', '$window'];

    function todoListService($http, Base64, $window) {
        var URL_BASE = 'http://localhost:8080/restapi/todolist';

        return {
            authorization: authorization,
            checkToken: checkToken,
            getTodoList: getTodoList,
            getHistoryTask: getHistoryTask,
            insertTodoList: insertTodoList,
            updateTodoList: updateTodoList,
            deleteTodoList: deleteTodoList
        }

        function authorization(_params) {
            /*var username = Base64.encode(params.username);
            var password = Base64.encode(params.password);*/
            var param = {
                username: Base64.encode(_params.username),
                password: Base64.encode(_params.password)
            };
            /*var auth = Base64.encode(username + ':' + password);
            $http.defaults.headers.common['Authorization'] = 'Basic ' + auth;*/

            var URL_LOGIN = 'http://localhost:8080/restapi/user/login';

            return $http.post(URL_LOGIN, param)
                .then(function (response) {
                    return response;
                })
                .catch(function (error) {
                    return error;
                });
        }

        function checkToken() {
            var token = $window.localStorage.getItem('token');
            //$http.defaults.headers.common['Authorization'] = 'Bearer ' + token;
            
            return $http.get(URL_BASE + '/checkToken', {headers: {
                'Authorization': 'Bearer ' + token
              }})
                .then(function (response) {
                    return response;
                })
                .catch(function (error) {
                    return error;
                });
        }

        function getTodoList() {
            var token = $window.localStorage.getItem('token');
            $http.defaults.headers.common['Authorization'] = 'Bearer ' + token;

            return $http.get(URL_BASE)
                .then(function (response) {
                    return response.data;
                })
                .catch(function (error) {
                    return error;
                });
        }

        function getHistoryTask(id) {
            var token = $window.localStorage.getItem('token');
            $http.defaults.headers.common['Authorization'] = 'Bearer ' + token;
            
            return $http.get(URL_BASE + '/status/' + id)
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
                    return response;
                })
                .catch(function (error) {
                    return error;
                });
        }
    }
})();