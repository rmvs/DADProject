const pool = require('../database/connection');

module.exports = {
    //Return incidents by Ong
    async index (req, res) {
        const id = req.headers.authorization;

        // const incidents = await connection('incidents')
        //     .where('ong_id', ong_id)
        //     .select('*');

        const { rows } = await pool.query(`select descricao,screenshotid,titulo from chamado c where c.id = ${id}`);

        rows.forEach(data => {
            data.screenshotid = `${data.id}_${data.screenshotid}`
        });
        
        res.json( rows );
    }
};