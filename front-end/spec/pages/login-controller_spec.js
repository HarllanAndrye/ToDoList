describe('LoginController', function () {

    var $controller, $rootScope, $httpBackend, service, $window, $location;

    beforeEach(function () {
        angular.mock.todolistMock();
    });

    beforeEach(inject(function ($injector) {
        $controller = $injector.get('$controller');
        $rootScope = $injector.get('$rootScope');
        $httpBackend = $injector.get('$httpBackend');
        service = $injector.get('TodoListService');
        $window = $injector.get('$window');
        $location = $injector.get('$location');
    }));

    afterEach(function () {
        $httpBackend.flush();

        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    beforeEach(function () {
        $httpBackend.whenGET('pages/login.tpl.html').respond(200, {});
        $httpBackend.whenGET('pages/home.tpl.html').respond(200, {});
    });

    describe('Testando Controller', function () {
        var vm, scope;

        beforeEach(function () {
            scope = $rootScope.$new();
            vm = $controller('LoginController', { '$rootScope': $rootScope, '$scope': scope });

        });
        // ENTRADA
        // SAÍDA
        // INIT
        // MÉT0DO TESTADO
        it(': deve estar definido', function () {
            expect(vm).toBeDefined();
        });

        it(': testando o metodo init() quando encontra o token', function () {
            // Init
            $location.path('/login');
            $window.localStorage.setItem('token', '1234567890');
            var val = {
                status: 200
            };

            // cria uma promise mock (fake, falsa) e retorna lista mock
            var p = new Promise(function (resolve, reject) { resolve(val); });
                        
            // cria um 'spy' (espião, função mascarada que simula a função real) e retorna a promise mock
            service.checkToken = jasmine.createSpy('checkToken').and.returnValue(p);

            // Método testado
            return vm.init()
                .then(function () {
                    expect($location.path()).toEqual('/home');
                });
        });

        it(': testando o metodo init() quando retorna erro', function () {
            // Init
            $location.path('/login');
            $window.localStorage.setItem('token', '1234567890');
            var val = {
                status: 401
            };

            // cria uma promise mock (fake, falsa) e retorna lista mock
            var p = new Promise(function (resolve, reject) { resolve(val); });
                        
            // cria um 'spy' (espião, função mascarada que simula a função real) e retorna a promise mock
            service.checkToken = jasmine.createSpy('checkToken').and.returnValue(p);

            // Método testado
            return vm.init()
                .then(function () {
                    expect($location.path()).toEqual('/login');
                });
        });

        it(': testando o metodo init() quando não existe o token', function () {
            // Init
            $location.path('/login');
            $window.localStorage.setItem('token', '');

            // Método testado
            vm.init();
            
            expect($location.path()).toEqual('/login');
        });

        it(': testando o metodo go()', function () {
            // Init
            vm.login = {
                username: 'test',
                passowrd: 'test'
            };

            var val = {
                status: 200,
                data: {
                    token: '1234567890'
                }
            };

            // cria uma promise mock (fake, falsa) e retorna lista mock
            var p = new Promise(function (resolve, reject) { resolve(val); });
                        
            // cria um 'spy' (espião, função mascarada que simula a função real) e retorna a promise mock
            service.authorization = jasmine.createSpy('authorization').and.returnValue(p);

            // Método testado
            return vm.go('/home')
                .then(function () {
                    expect($window.localStorage.getItem('token')).toEqual('1234567890');
                });
        });

        it(': testando o metodo go() com retorno 400', function () {
            // Init
            vm.login = {
                username: 'test',
                passowrd: 'test'
            };

            var val = {
                status: 400,
                data: {
                    error: 'erro qualquer'
                }
            };

            // cria uma promise mock (fake, falsa) e retorna lista mock
            var p = new Promise(function (resolve, reject) { resolve(val); });
                        
            // cria um 'spy' (espião, função mascarada que simula a função real) e retorna a promise mock
            service.authorization = jasmine.createSpy('authorization').and.returnValue(p);

            // Método testado
            return vm.go('/home')
                .then(function () {
                    expect($rootScope.listaMensagens[0].text).toEqual('erro qualquer');
                });
        });

        it(': testando o metodo go() com retorno 401', function () {
            // Init
            vm.login = {
                username: 'test',
                passowrd: 'test'
            };

            var val = {
                status: 401
            };

            // cria uma promise mock (fake, falsa) e retorna lista mock
            var p = new Promise(function (resolve, reject) { resolve(val); });
                        
            // cria um 'spy' (espião, função mascarada que simula a função real) e retorna a promise mock
            service.authorization = jasmine.createSpy('authorization').and.returnValue(p);

            // Método testado
            return vm.go('/home')
                .then(function () {
                    expect($rootScope.listaMensagens[0].tipo).toEqual('warning');
                });
        });

    });
});
