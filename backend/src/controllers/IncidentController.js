const sequelize = require('../database/connection');

module.exports = {
    //listagem dos incidentes paginada de 5 em 5 incidentes
    async index (req, res) {
        const { page = 1 } = req.query;

        //contador do número de incidentes
        const [count] = await connection('incidents').count();

        //pesquisa paginada no banco de dados
        // const incidents = await connection('incidents')
        // .join('ongs','ongs.id', '=', 'incidents.ong_id')
        // .limit(5)
        // .offset((page - 1) * 5)
        // .select(['incidents.*', 'ongs.name', 'ongs.email', 'ongs.whatsapp', 'ongs.city', 'ongs.uf']);
        
        // const { rows } = await pool.query("select * from chamados c inner join user_chamado uc on uc.id = c.userid ")        

        var incidents = []

        rows.forEach({

        })

        //retorno do numero de incidentes para o header de resposta 
        res.header('X-Total-Count', incidents.length);

        //retorno dos incidentes de acordo com a paginação
        return res.json( incidents );
    },

    async create (req, res) {
        const { titulo, descricao, valor } = req.body;
        const user_id = req.headers.authorization;

        const user = await sequelize.models.Usuario.findByPk(user_id);
        const pessoa = await user.getPessoa();
        
        const chamado = await sequelize.models.Chamado.build({
            titulo: titulo,
            descricao: descricao,
            arrecadado: valor,
            anexoid: req.files.length > 0 ? req.files[0].blobName : null,
            fechado: false,
        });
        chamado.setPessoa(pessoa)
        await chamado.save();

        // const [id] = await connection('incidents').insert({
        //     title, description, value, ong_id
        // });

        // res.json({ id });
        res.json({'id': chamado.id})
    },

    async delete(req, res) {

        const { id } = req.params;
        const idUsuario = req.headers.authorization;

        const usu = await sequelize.models.Usuario.findByPk(idUsuario);
        const pessoa = await usu.getPessoa();

        const chamado = await sequelize.models.Chamado.findByPk(id);
        
        if (chamado.pessoaid != pessoa.id) {
            res.status(401).json({'error': 'Operação não permitida.'});
        } else {
            await chamado.removeParticipantes(await chamado.getParticipantes());
            await chamado.destroy();
            res.status(204).send();
        }

    },
    async join(req, res){

        const { pessoaid, chamadoid } = req.body;
        const idUsuario = req.headers.authorization;

        const chamado = await sequelize.models.Chamado.findByPk(chamadoid);

        const pessoa = await sequelize.models.Pessoa.findByPk(pessoaid)

        const participantes = await chamado.getParticipantes();
        const found = participantes.find(s => s.id == pessoaid);

        if(!found){
            chamado.addParticipante(pessoa);
        }else{
            chamado.removeParticipante(pessoa);
        }
        

        await chamado.save();

        res.status(200).send();
    }
};