const Router = require('express');
const usuarioController = require('../controllers/usuarioController.js');

const routes = new Router();

routes
  .post("/cadastro", usuarioController.cadastrar)
  .get("/listarUsers", usuarioController.listarUser)
  .delete("/deletarUser/:id", usuarioController.deletarUsuario)
  .post("/cadastroAdm", usuarioController.cadastrarAdministrador)
  .get("/listarADM", usuarioController.listarADM)
  
module.exports = routes;