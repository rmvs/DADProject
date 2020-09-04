const pool = require('../database/connection');
// const crypto = require('crypto');
const md5 = require('md5');

module.exports = {
    async create(req, res) {
        const {nome, email, login, senha} = req.body;
        // const id = crypto.randomBytes(4).toString('HEX');

        const { rows } = await pool.query(`select count(*) from user_chamado where login = ${login}`)
        console.log(rows)
        if (rows[0] > 0) {
            return res.json({'status':403})
        }

        const result = await pool.query(`insert into user_chamado (login,senha) values(${login},${md5(senha)})`)
        console.log(result)

        return res.json({'status':200, 'id': result.rows[0].id});
    },
    async login(req,res) {
        const { login,senha } = req.body;
        const { rows } = await pool.query(`select p.id,u.login as user,u.senha as pass,p.nome,p.email from usuario u inner join pessoa p on p.userid = u.id  where login = '${login}'`)
        if(rows.length == 0){
            return res.status(403);
        }
        const { id,user,pass,nome,email } = rows[0]

        if(md5(senha) != pass){
            console.log('senha ou usuario invalido')
            return res.status(200).json({'erro': 'senha inválida'})
        }
        
        return res.json({'status':200, 'id': id, 'nome': nome, 'email': email});
    }

};