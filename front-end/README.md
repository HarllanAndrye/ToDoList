# Front-end

Tecnologias utilizadas:

- [AngularJS](https://angularjs.org/)
- [Grunt](https://gruntjs.com/): utilizado para automatizar tarefas.
- [Jasmine](https://jasmine.github.io/): test runner - para executar (rodar) os testes.
- [Karma](https://karma-runner.github.io/latest/index.html): para criar os testes.

Utilizando como base o [Dragula](http://bevacqua.github.io/angularjs-dragula/) (Drag and drop so simple it hurts).

## Iniciando a aplicação

Primeiro é necessário instalar as dependências, usando o comando:
```shell script
npm install
```

Para executar o projeto localmente, use:
```shell script
grunt
```

A aplicação ficará disponível no endereço: `http://localhost:8000`

Para executar os testes de unidade, use:
```shell script
karma start karma.conf.js
```

## Acesso

Ao iniciar a aplicação, a página exibida será a de login e os dados de login são:

- E-mail (username): teste@email.com OU user@email.com
- Password: 123456

Esses dados podem ser alterados no back-end, no arquivo `/resources/import-test.sql`.