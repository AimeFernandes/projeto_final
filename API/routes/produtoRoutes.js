const Router = require('express');
const produtoController = require('../controllers/produtoController.js');

const routes = new Router();

routes
    .get("/listarProdutos", produtoController.listarProdutos)
    .get("/buscarProduto/:id", produtoController.buscarProduto)
    .get("/buscarProdutoNome/:nome", produtoController.buscarProdutoNome)
    .post("/produtos", produtoController.addProduto) 
    .put("/editarProduto/", produtoController.editarProduto)
    .delete("/deletarProduto/:id", produtoController.deletarProduto);


module.exports = routes;