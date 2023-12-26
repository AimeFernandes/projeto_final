const conexaoBancoDeDados = require('../database/db_connection.js');

class AuthModel {
  async logar(email, password) {
    const conexao = await conexaoBancoDeDados.conectar();
    const comandoSql = "SELECT * FROM usuario WHERE email = $1 AND password = $2";
    const usuario = await conexao.query(comandoSql, [email, password]);
    return usuario.rows;
  }
}

module.exports = new AuthModel();