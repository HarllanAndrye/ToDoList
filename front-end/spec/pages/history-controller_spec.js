describe('HistoryController', function () {

    var $controller, $rootScope, $httpBackend, service, $compile, $window;

    beforeEach(function () {
        angular.mock.todolistMock();
    });

    beforeEach(inject(function ($injector) {
        $controller = $injector.get('$controller');
        $rootScope = $injector.get('$rootScope');
        $httpBackend = $injector.get('$httpBackend');
        service = $injector.get('TodoListService');
        $location = $injector.get('$location');
        $window = $injector.get('$window');
    }));

    afterEach(function () {
        $httpBackend.flush();

        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    beforeEach(function () {
        $httpBackend.whenGET('pages/login.tpl.html').respond(200, {});
        $httpBackend.whenGET('pages/home.tpl.html').respond(200, {});
        $httpBackend.whenGET('pages/history.tpl.html').respond(200, {});
    });

    describe('Testando Controller', function () {
        var vm, scope;

        beforeEach(function () {
            scope = $rootScope.$new();
            vm = $controller('HistoryController', { '$rootScope': $rootScope, '$scope': scope });

        });
        // ENTRADA
        // SAÍDA
        // INIT
        // MÉT0DO TESTADO
        it(': deve estar definido', function () {
            expect(vm).toBeDefined();
        });

        it(': testando o metodo init() com retorno 401', function () {
            // Init
            $rootScope['historyDescription'] = 'historyTeste';
            $location.path('/home');
            
            var data = {
                status: 401
            }

            // Cria uma promise mock
            var promiseMock = new Promise(function (resolve, reject) { resolve(data); });
            // cria um 'spy'
            service.getHistoryTask = jasmine.createSpy('getHistoryTask').and.returnValue(promiseMock);

            // Método testado
            return vm.init()
                .then(function (response) {
                    expect(vm.descriptionTask).toEqual('historyTeste');
                    expect($location.path()).toEqual('/login');
                });
        });

        it(': testando o metodo init()', function () {
            // Init
            $rootScope['historyDescription'] = 'historyTeste';
            
            var data = {
                "creationDate": "2020-11-20T17:53:37.439Z",
                "id": 1,
                "status": "string",
                "userName": "teste"
            };

            // Cria uma promise mock
            var promiseMock = new Promise(function (resolve, reject) { resolve(data); });
            // cria um 'spy'
            service.getHistoryTask = jasmine.createSpy('getHistoryTask').and.returnValue(promiseMock);

            // Método testado
            return vm.init()
                .then(function (response) {
                    expect(vm.descriptionTask).toEqual('historyTeste');
                    expect(vm.taskStatus.userName).toEqual('teste');
                });
        });

        it(': testando o metodo goHome()', function () {
            // Init
            $rootScope['historyDescription'] = 'historyTeste';
            $location.path('/login');

            // Método testado
            vm.goHome();

            expect($rootScope['historyDescription']).toEqual('');
            expect($location.path()).toEqual('/home');
        });

    });
});
