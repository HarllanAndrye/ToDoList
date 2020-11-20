--o nome da tabela é o mesmo da classe, ou seja, com primeira letra maiúscula: Ex, User.
--A senha é "123456" e foi gerada com a classe PasswordEncoder
INSERT INTO User (id, name, email, password, permission) VALUES ('dd58ad74bfba402ea105226f2eb598e9', 'Admin', 'teste@email.com', '8D969EEF6ECAD3C29A3A629280E686CF0C3F5D5A86AFF3CA12020C923ADC6C92', 'ADMIN');
INSERT INTO User (id, name, email, password, permission) VALUES ('7b2dec12ca2749ef950101cfeab7eabc', 'User', 'user@email.com', '8D969EEF6ECAD3C29A3A629280E686CF0C3F5D5A86AFF3CA12020C923ADC6C92', 'USER');