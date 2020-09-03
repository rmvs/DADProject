const knex = require('knex');
const configuration = require('../../knexfile');//importo o arquivo de configurações do knexfile

//criando a conexão com o banco
const connection = knex(configuration.development);

//exporta a conexão com o banco de dados
module.exports = connection;