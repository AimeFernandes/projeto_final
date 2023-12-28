const Router = require('express');
const pecaController = require('../controllers/pecaController.js');

const routes = new Router();

routes
    .get("/listarPecas", pecaController.listarPecas)
    .get("/buscarPecaPorId/:id", pecaController.buscarPecaPorId)
    .get("/buscarPecaPorNome/:nome", pecaController.buscarPecaPorNome)
    .post("/addPeca", pecaController.addPeca) 
    .put("/editarPeca/:id", pecaController.editarPeca)
    .delete("/deletarPeca/:id", pecaController.deletarPeca);

module.exports = routes;