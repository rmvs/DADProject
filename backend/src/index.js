const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

/**
 * MÉTODOS HTTP:
 * 
 * GET: Usado pelo cliente para BUSCAR/LISTAR uma informação no back-end
 * POST: Usado pelo cliente para ENVIAR uma informação para o back-end
 * PUT: Usado pelo cliente para ATUALIZAR uma informação no back-end
 * DELETE: Usado pelo cliente para DELETAR uma informação no back-end
 * 
 */

 /**
  * TIPOS DE PARÂMETROS:
  * 
  * QUERY PARAMS: Parâmetros nomeados enviados na rota após "?" (Filtros, Paginação)
  *     EXE.: /users?name=Mat (usuarios com nome mat) , /users?page=2, ou unindo os exemplos anteiores com &,
  *     /rota?page=2&name=Mat
  * ROUTE PARAMS: Parâmetros utilizados para identificar recursos da rota
  *     EXE.: na rota ususários /users/:id, em que o id identifica o usuário, podendo ser substituido por /users/1
  * REQUEST BODY: Corpo da requisição utilizado para criar ou alterar um recurso
  */

  /**
   * BANCOS DE DADOS:
   * 
   * SQL: MySQL, SQLite, PostgreSQL, Oracle, Microsoft SQL Server
   * NoSQL: MongoDB, CouchDB, etc...
   * 
   * Vamos utilizar o SQLite nesta aplicação
   * 
   * Tipos de buscas:
   * 
   * Driver: SELECT * FROM users
   * Query Builder: table('users').select('*').where()
   * 
   */

//A rota com / é utilizada para definir uma resposta padrão para rota raiz
app.listen(5050);

console.log('listening on port 5050...');