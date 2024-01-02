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

  async buscarUserPorId(id_peca) {
    const conexao = await conexaoBancoDeDados.conectar();
    const comandoSql = "SELECT * FROM usuario WHERE id_peca = ($1)";
    const user = await conexao.query(comandoSql, [id_peca]);
    return user.rows;
  }

  async deletarUsuario(id_usuario) {
    const conexao = await conexaoBancoDeDados.conectar();
    const comandoSql = "DELETE FROM usuario WHERE id_usuario = ($1)";
    const resp = await conexao.query(comandoSql, [id_usuario]);
    return resp;
  }

  async cadastrarAdministrador(id_usuario, permissaoDeAlteracoes) {
    const conexao = await conexaoBancoDeDados.conectar();
    
    const comandoSql = "INSERT INTO administrador (id_usuario, permissaoDeAlteracoes) VALUES ($1, $2)";
    return await conexao.query(comandoSql, [id_usuario, permissaoDeAlteracoes]);
  }

  async listarADM() {
    const conexao = await conexaoBancoDeDados.conectar();
    const comandoSql = "SELECT * FROM administrador";
    const listaUser = await conexao.query(comandoSql);
    return listaUser.rows;
  }

}

module.exports = new UsuarioModel();