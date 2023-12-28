const pecaModel = require("../models/pecaModel")

class PecaController {
    async listarPecas(req, res) {
        try {
            const pecas = await pecaModel.listarPecas();
            res.status(200).json(pecas);
        } catch (error) {
            res.status(500).send({ message: `Erro ao listar peças - ${error}` });
        }
    }
    
    async buscarPecaPorId(req, res) {
        try {
            const id = parseInt(req.params.id)
            const pecas = await pecaModel.buscarPecaPorId(id);
            console.log(pecas)
            res.status(200).json(pecas);
        } catch (error) {
            res.status(500).send({ message: `Erro ao buscar peça - ${error}` });
        }
    }
    
    async buscarPecaPorNome(req, res) {
        try {
            const nome = req.params.nome
            const pecas = await pecaModel.buscarPecaPorNome(nome);
            res.status(200).json(pecas);
        } catch (error) {
            res.status(500).send({ message: `Erro ao buscar peça - ${error}` });
        }
    }
    
    async addPeca(req,res) {
        const { nome, preco, descricao, quantidade } = req.body;
        try {
            await pecaModel.addPeca(nome, preco, descricao, quantidade)
            res.status(200).send({mensagem: "Peça adicionada"})
        } catch (error) {
            res.status(500).send({ mensagem: `Erro ao adicionar peça - ${error}` });
        }
    }
    
    async deletarPeca(req, res) {
        try {
            const idDaPeca = parseInt(req.params.id);
            const resp = await pecaModel.deletarPeca(idDaPeca);
            res.status(500).send({ message: "Peça deletada com sucesso" });
        } catch (error) {
            res.status(500).send({ message: `Erro ao deletar peça - ${error}` });
        }
    }
    
    async editarPeca(req, res) {
        const { nome, preco, descricao, quantidade, id_peca } = req.body;
        try {

            await pecaModel.editarPeca(nome, preco, descricao, quantidade, id_peca);
            res.status(200).send({ message: "Peça atualizado!" });

        } catch (error) {
            res.status(500).send({ message: `Erro ao editar peça - ${error}` });
        }
    }
}

module.exports = new PecaController();