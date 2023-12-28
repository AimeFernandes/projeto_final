const usuarioModel = require('../models/usuarioModel.js');

class UsuarioController {

  async cadastrar(req, res) {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).send({ message: "Digite seu email" });
    }
    if (!password) {
      return res.status(400).send({ message: "Digite sua senha" });
    }
    try {
      const resultado = await usuarioModel.cadastrar(email, password);
      return res
        .status(201)
        .send({ message: "Usuário cadastrado com sucesso" });
    } catch (error) {
      res.status(400).send({ message: `Erro ao cadastrar Usuário - ${error}` });
    }
  }

  async listarUser(req, res) {
    try {
        const pecas = await usuarioModel.listarUser();
        res.status(200).json(pecas);
    } catch (error) {
        res.status(500).send({ message: `Erro ao listar usuarios - ${error}` });
    }
  }

  async deletarUsuario(req, res) {
    try {
        const id_usuario = parseInt(req.params.id);
        const resp = await usuarioModel.deletarUsuario(id_usuario);
        res.status(500).send({ message: "Usuário deletado com sucesso" });
    } catch (error) {
        res.status(500).send({ message: `Erro ao deletar usuário - ${error}` });
    }
}

}

module.exports = new UsuarioController();