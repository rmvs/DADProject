const sequelize = require('../database/connection');

module.exports = {
    //Return incidents by Ong
    async index (req, res) {
        const id_ = req.headers.authorization;
        const user = await sequelize.models.Usuario.findByPk(id_);
        const pes = await user.getPessoa();

        // const incidents = await connection('incidents')
        //     .where('ong_id', ong_id)
        //     .select('*');

        const chamados = await sequelize.models.Chamado.findAll();
        let chamados_ = [];

        for(var i = 0; i  < chamados.length; i++){
            s = chamados[i];
            const p = await s.getParticipantes();
            const found = p.find(s => s.id == pes.id);
            const pessoa = await s.getPessoa();
            let autor = null
            if(pessoa != null){
                autor = {
                    id: pessoa.id,
                    nome: pessoa.nome,
                    email: pessoa.email,
                    ongnome: pessoa.ongnome                 
                }
            }
            chamados_.push({
                id: s.id,
                titulo: s.titulo,
                descricao: s.descricao,
                anexoid: s.anexoid,
                fotoid: s.fotoid,
                arrecadado: s.arrecadado || 0,
                fechado: s.fechado || false,
                participantes: p.length,
                participa: found != null,
                autor: autor
            }) 
        }
        
        res.json( chamados_ );
    }
};