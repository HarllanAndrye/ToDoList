describe('TodoListService', function () {

    beforeEach(module('todolist'));

    describe('Testando Service', function () {
        var service, $httpBackend;

        //var respSuccess = 'sucesso';
        var respSuccess = {
            "status": "OK",
            "data": {},
            "statusCode": 200
        };

        var respSuccessCreated = {
            "status": "Created",
            "data": {},
            "statusCode": 201
        };

        beforeEach(inject(function ($injector) {
            service = $injector.get('TodoListService');
            $httpBackend = $injector.get('$httpBackend');
        }));

        beforeEach(function () {
            $httpBackend.whenGET('pages/home.tpl.html').respond(200, {});
        });

        // INIT
        // ENTRADA
        // SAÍDA
        // MÉT0DO TESTADO
        it(': deve estar DEFINIDA', function () {
            expect(service).toBeDefined();
        });

        describe(': requisição para getTodoList()', function () {
            var urlReq = 'http://localhost:8080/restapi/todolist';
            var req = {};
            var method = 'GET';
            it('deve dar sucesso', function () {
                // Init
                $httpBackend.when(method, urlReq)
                    .respond(200, respSuccess);
                // Método testado
                service.getTodoList(req)
                    .then(function (response) {
                        //expect(response).toEqual('sucesso');
                        expect(response.status).toEqual('OK');
                    });
                $httpBackend.flush();
            });

            it('deve dar erro', function () {
                // Init
                $httpBackend.when(method, urlReq)
                    .respond(400, {});
                // Método testado
                service.getTodoList(req, 0);
                $httpBackend.flush();
            });
        });

        describe(': requisição para insertTodoList()', function () {
            var params = {
                "test": 1,
            };
            var urlReq = 'http://localhost:8080/restapi/todolist/insert';
            var method = 'POST';
            
            it('deve dar sucesso', function () {
                // Init
                $httpBackend.when(method, urlReq, params)
                    .respond(201, respSuccess);
                
                // Método testado
                service.insertTodoList(params)
                    .then(function (response) {
                        expect(response.status).toEqual('OK');
                    });
                $httpBackend.flush();
            });

            it('deve dar erro', function () {
                // Init
                $httpBackend.when(method, urlReq, params)
                    .respond(400, {});
                // Método testado
                service.insertTodoList(params, 0);
                $httpBackend.flush();
            });
        });

        // TODO - PUT
        describe(': requisição para updateTodoList()', function () {
            var params = {
                "id": "1",
                "name": "Tarefa",
                "status": "TODO"
            };
            var urlReq = 'http://localhost:8080/restapi/todolist/update/1';
            var method = 'PUT';

            it('deve dar sucesso', function () {
                // Init
                $httpBackend.when(method, urlReq).respond(201, respSuccess);
                
                // Método testado
                service.updateTodoList(params)
                    .then(function (response) {
                        expect(response).toEqual(201);
                    });
                $httpBackend.flush();
            });

            it('deve dar erro', function () {
                // Init
                $httpBackend.when(method, urlReq)
                    .respond(400, {});
                // Método testado
                service.updateTodoList(params, 0);
                $httpBackend.flush();
            });
        });

        describe(': requisição para deleteTodoList()', function () {
            var id = 1;
            var urlReq = 'http://localhost:8080/restapi/todolist/delete/1';
            var method = 'DELETE';

            it('deve dar sucesso', function () {
                // Init
                $httpBackend.when(method, urlReq)
                    .respond(200, respSuccess);
                // Método testado
                service.deleteTodoList(id)
                    .then(function (response) {
                        expect(response.status).toEqual('OK');
                    });
                $httpBackend.flush();
            });

            it('deve dar erro', function () {
                // Init
                $httpBackend.when(method, urlReq)
                    .respond(400, {});
                // Método testado
                service.deleteTodoList(id, 0);
                $httpBackend.flush();
            });
        });

    });
});
