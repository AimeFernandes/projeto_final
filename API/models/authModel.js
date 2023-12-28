const conexaoBancoDeDados = require('../database/db_connection.js');
const bcrypt = require("bcryptjs")

class AuthModel {
  async logar(email, password) {
    const conexao = await conexaoBancoDeDados.conectar();

    //Buscar o hash da senha armazenado no banco de dados usando o email
    const querySenha = "SELECT password FROM usuario WHERE email = $1";
    const resultadoQuery = await conexao.query(querySenha, [email]);

    if (resultadoQuery.rows.length === 0) {
      // Usuário não encontrado
      return null;
    }

    const hashArmazenado = resultadoQuery.rows[0].password;

    // Comparar a senha fornecida com o hash armazenado
    const passwordMatch = await bcrypt.compare(password, hashArmazenado);

    if (!passwordMatch) {
      // Senha incorreta
      return null;
    }

    // Senha correta, retornar os dados do usuário
    const comandoSql = "SELECT * FROM usuario WHERE email = $1";
    const usuario = await conexao.query(comandoSql, [email]);

    return usuario.rows[0];
  }
}

module.exports = new AuthModel();