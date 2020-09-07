const sequelize = require('../database/connection');
// const crypto = require('crypto');
const md5 = require('md5');

module.exports = {
    async create(req, res) {
        console.log('passou aqui');
        const {nome, email, login, senha, ongnome } = req.body;

        const user = sequelize.models.Usuario.build({
            login: login,
            senha: md5(senha),
            Pessoa:{
                nome: nome,
                email: email,
                ongnome: ongnome
            }
        },{
            include: [sequelize.models.Pessoa]
        });

        await user.save();

        return res.json({'status':200, 'id': user.id});
    },
    async login(req,res) {
        const { login,senha } = req.body;
        const user = await sequelize.models.Usuario.findOne({
            where: {
                login: login
            }
        })
        if(!user){
            return res.status(403);
        }


        if(md5(senha) != user.senha){
            console.log('senha ou usuario invalido')
            return res.status(200).json({'erro': 'senha inválida'})
        }

        const pessoa = await user.getPessoa();
        
        return res.json({'status':200, 'id': user.id,'pessoaid':pessoa.id , 'nome': pessoa.nome, 'email': pessoa.email});
    }

};