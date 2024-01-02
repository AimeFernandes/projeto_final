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
        const usuario = await usuarioModel.listarUser();
        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).send({ message: `Erro ao listar usuarios - ${error}` });
    }
  }

  async buscarUserPorId(req, res) {
    try {
        const id = parseInt(req.params.id)
        const user = await usuarioModel.buscarUserPorId(id);
        console.log(user)
        res.status(200).json(user);
    } catch (error) {
        res.status(500).send({ message: `Erro ao buscar usuário - ${error}` });
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

  async cadastrarAdministrador(req, res) {
    const { id_usuario, permissaoDeAlteracoes } = req.body;
    if (!id_usuario) {
      return res.status(400).send({ message: "id do usuario invalido" });
    }
    if (!permissaoDeAlteracoes) {
      return res.status(400).send({ message: "Nivel de Permissão não concebido" });
    }
    try {
      const resultado = await usuarioModel.cadastrarAdministrador(id_usuario, permissaoDeAlteracoes);
      return res
        .status(201)
        .send({ message: "Administrador cadastrado com sucesso" });
    } catch (error) {
      res.status(400).send({ message: `Erro ao cadastrar administrador - ${error}` });
    }
  }

  async listarADM(req, res) {
    try {
        const adm = await usuarioModel.listarADM();
        res.status(200).json(adm);
    } catch (error) {
        res.status(500).send({ message: `Erro ao listar o adm - ${error}` });
    }
  }

}

module.exports = new UsuarioController();