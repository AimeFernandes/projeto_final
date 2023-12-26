const express = require('express');
const cors = require('cors');
const usuario = require('./API/routes/usuarioRoutes.js');
const login = require('./API/routes/login.js');
const produto = require("./API/routes/produtoRoutes")

const app = express();

app.use(cors("*"), express.json(), login, usuario, produto);

app.listen(3000, () => {
  console.log("A API está rodando na porta 3000");
});