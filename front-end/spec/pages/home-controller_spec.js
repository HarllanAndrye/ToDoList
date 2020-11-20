describe('HomeController', function () {

    var $controller, $rootScope, $httpBackend, service, $compile, $window;

    beforeEach(function () {
        angular.mock.todolistMock();
    });

    beforeEach(inject(function ($injector) {
        $controller = $injector.get('$controller');
        $rootScope = $injector.get('$rootScope');
        $httpBackend = $injector.get('$httpBackend');
        service = $injector.get('TodoListService');
        $compile = $injector.get('$compile');
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
    });

    describe('Testando Controller', function () {
        var vm, scope;

        beforeEach(function () {
            scope = $rootScope.$new();
            vm = $controller('HomeController', { '$rootScope': $rootScope, '$scope': scope });

        });
        // ENTRADA
        // SAÍDA
        // INIT
        // MÉT0DO TESTADO
        it(': deve estar definido', function () {
            expect(vm).toBeDefined();
        });

        it(': deve iniciar buscando as tarefas - metodo init()', function () {
            // Init
            var data = {
                status: 401
            }

            // Cria uma promise mock
            var promiseMock = new Promise(function (resolve, reject) { resolve(data); });
            // cria um 'spy'
            service.getTodoList = jasmine.createSpy('getTodoList').and.returnValue(promiseMock);

            // Método testado
            vm.init();

            expect(service.getTodoList).toHaveBeenCalled();
        });

        it(': deve inserir a tarefa - metodo formData()', function () {
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
        });

        it(': testando o metodo taskData() para o target todoID', function () {
            // Init
            var target_id = 'todoID';
            el = $compile('<div id="todoID"></div>')(scope);

            scope.todoDragulaModel = {
                id: 1
            };

            // Criando um spy do método find()
            scope.todoDragulaModel.find = jasmine.createSpy('find').and.returnValue(1);

            // cria uma promise mock
            var p = new Promise(function (resolve, reject) { resolve(201); });
            
            // cria um 'spy'
            service.updateTodoList = jasmine.createSpy('updateTodoList').and.returnValue(p);

            jasmine.clock().install();

            // Método testado
            vm.taskData('', el, target_id, '');
            
            jasmine.clock().tick(500);

            jasmine.clock().uninstall();
        });

        it(': testando o metodo taskData() para o target doingID', function () {
            // Init
            var target_id = 'doingID';
            el = $compile('<div id="doingID"></div>')(scope);

            scope.todoDragulaModel = {
                id: 1
            };

            // Criando um spy do método find()
            scope.doingDragulaModel.find = jasmine.createSpy('find').and.returnValue(1);

            // cria uma promise mock
            var p = new Promise(function (resolve, reject) { resolve(201); });
            
            // cria um 'spy'
            service.updateTodoList = jasmine.createSpy('updateTodoList').and.returnValue(p);

            jasmine.clock().install();

            // Método testado
            vm.taskData('', el, target_id, '');
            
            jasmine.clock().tick(500);

            jasmine.clock().uninstall();
        });

        it(': testando o metodo taskData() para o target doneID', function () {
            // Init
            var target_id = 'doneID';
            el = $compile('<div id="doneID"></div>')(scope);

            scope.todoDragulaModel = {
                id: 1
            };

            // Criando um spy do método find()
            scope.doneDragulaModel.find = jasmine.createSpy('find').and.returnValue(1);

            // cria uma promise mock
            var p = new Promise(function (resolve, reject) { resolve(201); });
            
            // cria um 'spy'
            service.updateTodoList = jasmine.createSpy('updateTodoList').and.returnValue(p);

            jasmine.clock().install();

            // Método testado
            vm.taskData('', el, target_id, '');
            
            jasmine.clock().tick(500);

            jasmine.clock().uninstall();
        });

        it(': testando o metodo taskData() para o target blockID', function () {
            // Init
            var target_id = 'blockID';
            el = $compile('<div id="blockID"></div>')(scope);

            scope.todoDragulaModel = {
                id: 1
            };

            // Criando um spy do método find()
            scope.blockDragulaModel.find = jasmine.createSpy('find').and.returnValue(1);

            // cria uma promise mock
            var p = new Promise(function (resolve, reject) { resolve(201); });
            
            // cria um 'spy'
            service.updateTodoList = jasmine.createSpy('updateTodoList').and.returnValue(p);

            jasmine.clock().install();

            // Método testado
            vm.taskData('', el, target_id, '');
            
            jasmine.clock().tick(500);

            jasmine.clock().uninstall();
        });

        it(': testando o metodo updateTodoList() com mensagem de erro', function () {
            // Init
            var params = {
                "id": 1,
                "name": "teste",
                "status": "TODO"
            };

            var val = {
                status: 400,  
                data: {
                    message: "Error"
                }
            };

            // cria uma promise mock
            var p = new Promise(function (resolve, reject) { resolve(val); });
            
            // cria um 'spy'
            service.updateTodoList = jasmine.createSpy('updateTodoList').and.returnValue(p);

            // Método testado
            return vm.updateTodoList(params, 'TODO')
                .then(function () {
                    expect($rootScope.listaMensagens[0].text).toEqual('Error');
                });
        });

        it(': testando o metodo logout()', function () {
            // Init
            $window.localStorage.setItem('token', '1234567890');

            // Método testado
            vm.logout();

            expect($window.localStorage.getItem('token')).toEqual('');
        });

        it(': testando o metodo deleteTask() para a task TODO', function () {
            // Init
            var id = 1;
            var status = 'TODO';
            var val = {
                status: 204
            };

            // Criando um spy do método filter()
            scope.todoDragulaModel.filter = jasmine.createSpy('filter').and.returnValue('Todo OK');

            // cria uma promise mock
            var p = new Promise(function (resolve, reject) { resolve(val); });
            // cria um 'spy'
            service.deleteTodoList = jasmine.createSpy('deleteTodoList').and.returnValue(p);

            // Criando um spy para o "confirm dialog"
            spyOn(window, 'confirm').and.returnValue(true);

            // Método testado
            return vm.deleteTask(id, status)
                .then(function () {
                    expect(scope.todoDragulaModel).toEqual('Todo OK');
                });
        });

        it(': testando o metodo deleteTask() para a task DOING', function () {
            // Init
            var id = 1;
            var status = 'DOING';
            var val = {
                status: 204
            };

            // Criando um spy do método filter()
            scope.doingDragulaModel.filter = jasmine.createSpy('filter').and.returnValue('Doing OK');

            // cria uma promise mock
            var p = new Promise(function (resolve, reject) { resolve(val); });
            // cria um 'spy'
            service.deleteTodoList = jasmine.createSpy('deleteTodoList').and.returnValue(p);

            // Criando um spy para o "confirm dialog"
            spyOn(window, 'confirm').and.returnValue(true);

            // Método testado
            return vm.deleteTask(id, status)
                .then(function () {
                    expect(scope.doingDragulaModel).toEqual('Doing OK');
                });
        });

        it(': testando o metodo deleteTask() para a task BLOCK', function () {
            // Init
            var id = 1;
            var status = 'BLOCK';
            var val = {
                status: 204
            };

            // Criando um spy do método filter()
            scope.blockDragulaModel.filter = jasmine.createSpy('filter').and.returnValue('Block OK');

            // cria uma promise mock
            var p = new Promise(function (resolve, reject) { resolve(val); });
            // cria um 'spy'
            service.deleteTodoList = jasmine.createSpy('deleteTodoList').and.returnValue(p);

            // Criando um spy para o "confirm dialog"
            spyOn(window, 'confirm').and.returnValue(true);

            // Método testado
            return vm.deleteTask(id, status)
                .then(function () {
                    expect(scope.blockDragulaModel).toEqual('Block OK');
                });
        });

        it(': testando o metodo deleteTask() com erro 403', function () {
            // Init
            var id = 1;
            var status = '';
            var val = {
                status: 403
            };

            // cria uma promise mock
            var p = new Promise(function (resolve, reject) { resolve(val); });
            // cria um 'spy'
            service.deleteTodoList = jasmine.createSpy('deleteTodoList').and.returnValue(p);

            // Criando um spy para o "confirm dialog"
            spyOn(window, 'confirm').and.returnValue(true);

            // Método testado
            return vm.deleteTask(id, status)
                .then(function () {
                    expect($rootScope.listaMensagens[0].tipo).toEqual('warning');
                    expect($rootScope.listaMensagens[0].text).toContain('Operação não permitida!');
                });
        });

        it(': testando o metodo deleteTask() com erro generico', function () {
            // Init
            var id = 1;
            var status = '';
            var val = {
                status: 500
            };

            // cria uma promise mock
            var p = new Promise(function (resolve, reject) { resolve(val); });
            // cria um 'spy'
            service.deleteTodoList = jasmine.createSpy('deleteTodoList').and.returnValue(p);

            // Criando um spy para o "confirm dialog"
            spyOn(window, 'confirm').and.returnValue(true);

            // Método testado
            return vm.deleteTask(id, status)
                .then(function () {
                    expect($rootScope.listaMensagens[0].tipo).toEqual('danger');
                    expect($rootScope.listaMensagens[0].text).toContain('Ocorreu um erro!');
                });
        });

    });
});
