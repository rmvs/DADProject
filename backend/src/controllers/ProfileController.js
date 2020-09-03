const connection = require('../database/connection');

module.exports = {
    //Return incidents by Ong
    async index (req, res) {
        const ong_id = req.headers.authorization;

        const incidents = await connection('incidents')
            .where('ong_id', ong_id)
            .select('*');
        
        res.json( incidents );
    }
};