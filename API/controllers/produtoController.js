const produtoModel = require("../models/produtoModel")

class ProdutoController {
    async listarProdutos(req, res) {
        try {
            const produtos = await produtoModel.listarProdutos();
            res.status(200).json(produtos);
        } catch (error) {
            res.status(500).send({ message: `Erro ao listar produtos - ${error}` });
        }
    }
    
    async buscarProduto(req, res) {
        try {
            const id = parseInt(req.params.id)
            const produtos = await produtoModel.buscarProduto(id);
            console.log(produtos)
            res.status(200).json(produtos);
        } catch (error) {
            res.status(500).send({ message: `Erro ao buscar produto - ${error}` });
        }
    }
    
    async buscarProdutoNome(req, res) {
        try {
            const nome = req.params.nome
            const produtos = await produtoModel.buscarProdutoNome(nome);
            res.status(200).json(produtos);
        } catch (error) {
            res.status(500).send({ message: `Erro ao buscar produto - ${error}` });
        }
    }
    
    async addProduto(req,res) {
        const { nome, quantidade, preco, descricao } = req.body;
        try {
            await produtoModel.addProduto(nome, quantidade, preco, descricao)
            res.status(200).send({mensagem: "Produto adicionado"})
        } catch (error) {
            res.status(500).send({ mensagem: `Erro ao adicionar o produto - ${error}` });
        }
    }
    
    async deletarProduto(req, res) {
        try {
            const idDoProduto = parseInt(req.params.id);
            const resp = await produtoModel.deletarProduto(idDoProduto);
            res.status(500).send({ message: "Deletado com sucesso" });
        } catch (error) {
            res.status(500).send({ message: `Erro ao deletar produto - ${error}` });
        }
    }
    
    async editarProduto(req, res) {
        const { id_peca } = req.params
        const { novoNome, novaQuantidade, novoPreco, novaDescricao } = req.body;
        try {
            await produtoModel.editarProduto(
                novoNome,
                novaQuantidade,
                novoPreco,
                novaDescricao,
                id_peca
        );
            res.status(200).send({ message: "Produto atualizado!" });
        } catch (error) {
            res.status(500).send({ message: `Erro ao editar produto - ${error}` });
        }
    }
}

module.exports = new ProdutoController();