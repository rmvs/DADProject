const express = require('express');
const crypto = require('crypto');
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.get('/', (req, res) => {
    res.json({
        res: 'Welcome to ReactProject',
        status: 200
    });
});

//Rota criada para acesso dos usuários da operação sem parâmetro
routes.get('/users', (req, res) => {
    const queryparams = req.query ? req.query : '';

    res.json({
        res: 'You just entered at get users route',
        query: queryparams,
        status: 200
    });

});

//Rota para acesso dos usuários passando parâmetro
routes.get('/users/:id', (req, res) => {

    const routeparams = req.params;

    res.json({
        res: 'You just entered at users/:id route',
        params: routeparams
    });

});

routes.post('/users', (req, res) => {

    const reqbody = req.body;

    res.json({
        res:'You just entered at post users route',
        body: reqbody
    });

});

//Get Ong Route
routes.get('/ongs', OngController.index);

//Create Ong Route
routes.post('/ongs', OngController.create);

//Get Incident ROute
routes.get('/incidents', IncidentController.index);

//Create Incident
routes.post('/incidents', IncidentController.create);

//Delete Incident
routes.delete('/incidents/:id', IncidentController.delete);

//Get ong's incidents
routes.get('/profile', ProfileController.index);

//Create Session Login
routes.post('/sessions', SessionController.create);

module.exports = routes;