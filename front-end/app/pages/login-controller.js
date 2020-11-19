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
            // Se o usuário estiver logado, redireciona para a página Home
            if (token) {
                helper.path('/home');
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