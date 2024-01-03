const express = require('express');
const cors = require('cors');
const usuario = require('./API/routes/usuarioRoutes.js');
const login = require('./API/routes/login.js');
const peca = require("./API/routes/pecaRoutes")

const app = express();

app.use(express.static("./sistema"))
app.use(cors(), express.json(), login, usuario, peca);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Erro interno do servidor!');
});

app.listen(3000, () => {
  console.log("A API está rodando na porta 3000");
});