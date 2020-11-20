(function () {
    "use strict";

    angular.module('todolist')
        .controller('LoginController', loginController);

    loginController.$inject = ['$location', '$scope', 'TodoListService', 'helperFactory', '$window'];

    function loginController($location, $scope, TodoListService, helper, $window) {
        var vm = this;

        vm.init = init;
        vm.go = go;

        function init() {
            var token = $window.localStorage.getItem('token');
            if (token) {
                return TodoListService.checkToken()
                .then(function (response) {
                    if (response.status == 200) {
                        // Se o usuário estiver logado, redireciona para a página Home
                        helper.path('/home');
                    } else {
                        $window.localStorage.setItem('token', '');
                    }
                });
            }
        }

        function go(_path) {
            if (typeof vm.login != 'undefined' && vm.login.username != '' && vm.login.password != '') {
                return TodoListService.authorization(vm.login)
                    .then(function (response) {
                        if (response.status == 200) {
                            $window.localStorage.setItem('token', response.data.token);
                            helper.path(_path);
                        } else {
                            if (response.status == 401) {
                                helper.addMsg('Login não autorizado! Verifique os dados inseridos.', 'warning', '');
                            } else if (response.status == 400) {
                                helper.addMsg(response.data.error, 'info', '');
                            }
                        }
                    });
            }
        }
    }

})();