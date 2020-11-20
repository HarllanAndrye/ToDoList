describe('helperFactory', function () {

    // beforeEach(function () {
    //     angular.mock.listaComprasMock();
    // });
    beforeEach(module('todolist'));

    describe('Testando Factory', function () {
        var factory, $httpBackend, $rootScope, $location, $q;

        beforeEach(inject(function ($injector) {
            factory = $injector.get('helperFactory');
            $httpBackend = $injector.get('$httpBackend');
            $rootScope = $injector.get('$rootScope');
            $location = $injector.get('$location');
            $q = $injector.get('$q');
        }));

        beforeEach(function () {
            $httpBackend.whenGET('pages/login.tpl.html').respond(200, {});
            $httpBackend.whenGET('pages/home.tpl.html').respond(200, {});
        });

        // INIT
        // ENTRADA
        // SAÍDA
        // MÉT0DO TESTADO
        it(': deve estar DEFINIDA', function () {
            expect(factory).toBeDefined();
        });

        it(': testando funcao sendError()', function () {
            // Entrada
            var ent = { data: { message: 'teste' } };
            // Saída
            var ret = { error: true, msg: 'teste' };
            
            // Método testado
            expect(factory.sendError(ent)).toEqual(ret);
        });

        it(': testando funcao addMsg()', function () {
            // Init
            $rootScope.listaMensagens = [];

            // Entrada
            var msg = "Mensagem";
            var tipo = "warning";
            var acao = "acao";
            
            // Método testado
            factory.addMsg(msg, tipo, acao);

            expect($rootScope.listaMensagens[0].tipo).toEqual('warning');
        });

        it(': testando funcao addMsg() com mensagem no rootScope', function () {
            // Init
            $rootScope.listaMensagens = ["Mensagem"];

            // Entrada
            var msg = "Mensagem";
            var tipo = "";
            var acao = "";
            
            // Método testado
            factory.addMsg(msg, tipo, acao);

            expect($rootScope.listaMensagens[0].tipo).toBeUndefined();
        });

        it(': testando funcao addMsg() sem mensagem', function () {
            // Init
            $rootScope.listaMensagens = ["Mensagem"];

            // Entrada
            var msg = "";
            var tipo = "";
            var acao = "";
            
            // Método testado
            factory.addMsg(msg, tipo, acao);

            expect($rootScope.listaMensagens[0]).toEqual('Mensagem');

            // Segundo teste
            $rootScope.listaMensagens = [];
            factory.addMsg(msg, tipo, acao);
            expect($rootScope.listaMensagens[0]).toBeUndefined();
        });

        it(': testando funcao setRootScope()', function () {
            // Init
            $rootScope["chave"] = [];

            // Entrada
            var key = "chave";
            var obj = "objeto";
            
            // Método testado
            factory.setRootScope(key, obj);

            expect($rootScope[key]).toEqual(obj);
        });

        it(': testando funcao getRootScope()', function () {
            // Init
            $rootScope["chave"] = "objeto";

            // Entrada
            var key = "chave";
            
            // Método testado
            expect(factory.getRootScope(key)).toEqual("objeto");
        });

        it(': testando funcao path()', function () {
            // Init
            $location.path("/login");
            $rootScope.listaMensagens = "alertas";

            // Entrada
            var path = "/home";
            
            // Método testado
            factory.path(path);

            expect($rootScope.listaMensagens.length).toEqual(0);
            expect($location.path()).toEqual("/home");

            $location.path("/login");
            // Método testado (sem path)
            factory.path("");
            expect($location.path()).toEqual("/login");
        });

        it(': testando funcao go() sem path', function () {
            // Init
            $location.path("/login");

            // Método testado (sem path)
            factory.go("");
            expect($location.path()).toEqual("/login");
        });

        it(': testando funcao go()', function () {
            // Init
            $location.path("/login");
            $rootScope.tokenUserLogged = true;

            // Método testado
            factory.go("/home");

            expect($location.path()).toEqual("/home");
        });

        it(': testando funcao go() redirecionando para a pagina de login', function () {
            // Init
            $location.path("/login");

            // Método testado
            factory.go("/home");

            expect($location.path()).toEqual("/login");
        });

    });
});
