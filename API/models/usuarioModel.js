const conexaoBancoDeDados = require('../database/db_connection.js');

class UsuarioModel {
  
  async cadastrar(email, password) {
    const conexao = await conexaoBancoDeDados.conectar();
    const comandoSql = "INSERT INTO usuario (email, password) VALUES ($1, $2)";
    return await conexao.query(comandoSql, [email, password]);
  }
}

module.exports = new UsuarioModel();