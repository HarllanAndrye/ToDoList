describe('Testando Filtros', function () {
    var $filter;

    beforeEach(module('todolist'));

    beforeEach(inject(function ($injector) {
        $filter = $injector.get('$filter');
    }));

    // INIT
    // ENTRADA
    // SAÍDA
    // MÉT0DO TESTADO
    it('$filter: deve estar DEFINIDO', function () {
        expect($filter).toBeDefined();
    });

    it(': deve colocar primeira letra maiuscula', function () {
        expect($filter('capitalize')('teste')).toEqual('Teste');
    });

    it(': nao deve fazer nada para o filtro capitalize', function () {
        expect($filter('capitalize')('')).toEqual('');
    });

});