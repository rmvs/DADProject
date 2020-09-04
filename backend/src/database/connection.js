// const knex = require('knex');
// const configuration = require('../../knexfile');//importo o arquivo de configurações do knexfile

// //criando a conexão com o banco
// const connection = knex(configuration.development);

// //exporta a conexão com o banco de dados
// module.exports = connection;

var pg = require('pg');
const config = {
    user: 'postgres',
    database: 'chamados',
    password: 'e8f)Gf~U&2]9',
    port: 5432,
    host: '104.45.148.219'
};

const pool = new pg.Pool(config);

(async () => {
    const { rows } = await pool.query("select count(*) from chamado")
    console.log('chamados:', rows[0])
})()

module.exports = pool