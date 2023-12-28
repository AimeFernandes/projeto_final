const conexaoBancoDeDados = require('../database/db_connection.js');
const bcrypt = require("bcryptjs")

class UsuarioModel {
  
  async cadastrar(email, password) {
    const conexao = await conexaoBancoDeDados.conectar();
    const saltRounds = 10 
    const salt = bcrypt.genSaltSync(saltRounds)
    const passwordHash = bcrypt.hashSync(password, salt)

    const comandoSql = "INSERT INTO usuario (email, password) VALUES ($1, $2)";
    return await conexao.query(comandoSql, [email, passwordHash]);
  }

  async listarUser() {
    const conexao = await conexaoBancoDeDados.conectar();
    const comandoSql = "SELECT * FROM usuario";
    const listaUser = await conexao.query(comandoSql);
    return listaUser.rows;
  }
}

module.exports = new UsuarioModel();