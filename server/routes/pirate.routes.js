const PirateController = require('../controller/pirate.controller');

module.exports = (app) => {
    app.post('/api/new', PirateController.crear);
    app.get('/api/pirate', PirateController.listar);
    app.get('/api/pirate/:id', PirateController.buscarPorId);
    app.put('/api/pirate/:id', PirateController.editar);
    app.delete('/api/pirate/:id', PirateController.eliminar);
}