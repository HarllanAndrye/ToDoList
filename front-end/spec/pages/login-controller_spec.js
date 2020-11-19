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

            // Método testado
            vm.init();
            
            expect($location.path()).toEqual('/home');
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
            vm.go('/home');
            
            expect($window.localStorage.getItem('token')).toEqual('1234567890');
        });

        /*it(': deve inserir a tarefa - metodo formData()', function () {
            // Init
            vm.form = {
                name: "Tarefa"
            };
            
            // lista mock
            var val = {
                "creationDate": "2020-11-16T15:14:38.872263",
                "id": 1,
                "name": "Teste",
                "status": "TODO",
                "user": "test"
              };
            
            // cria uma promise mock (fake, falsa) e retorna lista mock
            var p = new Promise(function (resolve, reject) { resolve(val); });
            
            // cria um 'spy' (espião, função mascarada que simula a função real) e retorna a promise mock
            service.insertTodoList = jasmine.createSpy('insertTodoList').and.returnValue(p);

            // Método testado
            return vm.formData()
                .then(function () {
                    expect(vm.form.name).toEqual("");
                    expect(scope.todoDragulaModel.length).toBeGreaterThan(0);
                });
        });*/

    });
});
