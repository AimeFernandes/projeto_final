const Router = require('express');
const usuarioController = require('../controllers/usuarioController.js');

const routes = new Router();

routes
  .post("/cadastro", usuarioController.cadastrar)
  .get("/listarUsers", usuarioController.listarUser)

module.exports = routes;