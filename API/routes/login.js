const {Router} = require('express');
const authController = require('../controllers/authController.js');

const routes = new Router();
routes.post("/login", authController.logar);

module.exports = routes;