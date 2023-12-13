const jwt = require('jsonwebtoken');
const authModel = require('../models/authModel.js');

class authController {
  async logar(req, res) {
    const { email, senha } = req.body;
    if (!email) {
      return res
        .status(400)
        .send({ login: false, message: "Digite seu email" });
    }
    if (!senha) {
      return res
        .status(400)
        .send({ login: false, message: "Digite sua senha" });
    }
    try {
      const usuario = await authModel.logar(email, senha);
      if (usuario.length == 0) {
        return res
          .status(404)
          .send({ login: false, message: "Não Autorizado" });
      }
      const token = jwt.sign(
        {
          id: usuario[0].id,
          email: usuario[0].email,
        },
        `${process.env.SECRET}`,
        {
          expiresIn: "1h",
        }
      );
      return res.status(200).send({ login: true, token: token });
    } catch (error) {
      return res
        .status(404)
        .send({ login: false, message: `Erro ao logar - ${error}` });
    }
  }
}

module.exports = new authController();