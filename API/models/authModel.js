const conexaoBancoDeDados = require('../database/db_connection.js');

class authModel {
  async logar(email, senha) {
    const conexao = await conexaoBancoDeDados.conectar();
    const comandoSql = "SELECT * FROM usuarios WHERE email = $1 AND senha = $2";
    const usuario = await conexao.query(comandoSql, [email, senha]);
    return usuario.rows;
  }
}

module.exports = new authModel();