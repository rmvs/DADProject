---
###  Projeto Desenvolvimento de Aplicações Distribuidas

---

# Sistema de Atendimento a Chamados

---

## Funcionamento

### Usuário

- O sistema tem como objetivo o cadastramento de ocorrencias relacionados a uma Ong. 
- Primeiramente deve-se cadastrar uma Ong, caso já não tenha sido cadastrada. O sistema retornará o Id da Ong que deve ser utilizado como chave para acessar o serviço. 
- Uma vez logado como Ong é possível adicionar novos casos relacionados a Ong em questão, tendo como campos o nome do caso, a descrição e o seu valor.
- Após o caso ter sido respondido, o gerenciador da Ong pode deletá-lo.

### Desenvolvedor

- O sistema funciona a partir da implementação de duas tecnologias, Nodejs e React Native, fazendo os papeis de backend e frontend, respectivamente. O frontend se utiliza do framework reactive native para implmentação das páginas em css e html para cada um dos serviços mencionados acima, além da listagem dos casos para cada ong. 
- O Backend implementado em Node funciona com um framework de gerenciamento de rotas chamado Express, que a partir do qual são disponibilizados serviços de login, cadastro de ongs, cadastro de casos e deleção de casos.
- O Frontend faz chamadas http ao Backend através do Axios, o qual é respondido através do Express.
Além disso o sistema faz acesso ao banco de dados através de um drive de banco de dados chamado Knex, para o qual foram escritas requisições e fora conectado o PostgreSQL.


## Arquitetura

![diagram](https://github.com/mcesarpl/DADProject/blob/master/doc/images/Diagram.png)


## Demo

- Aplicação\
http://137.117.85.184/

- Servidor de banco de dados e backend REST\
http://104.45.148.219/
