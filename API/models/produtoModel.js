const conexaoBancoDeDados = require('../database/db_connection.js');


class ProdutoModel  {
    async addProduto(nome, quantidade, preco, descricao) {
        const conexao = await conexaoBancoDeDados.conectar();
        const sql = 
            "INSERT INTO pecas (nome, quantidade, preco, descricao) VALUES ($1, $2, $3, $4)";
        return await conexao.query(sql, [nome, quantidade, preco, descricao]);
    }
    
    async listarProdutos() {
        const conexao = await conexaoBancoDeDados.conectar();
        const comandoSql = "SELECT * FROM pecas";
        const listaProdutos = await conexao.query(comandoSql);
        return listaProdutos.rows;
    }
    
    async buscarProduto(id_peca) {
        const conexao = await conexaoBancoDeDados.conectar();
        const comandoSql = "SELECT * FROM pecas WHERE id_peca = ($1)";
        const produto = await conexao.query(comandoSql, [id_peca]);
        return produto.rows;
    }
    
    async buscarProdutoNome(nome) {
        const conexao = await conexaoBancoDeDados.conectar();
        const comandoSql = "SELECT * FROM pecas WHERE nome ILIKE '%'||$1||'%'";
        const produto = await conexao.query(comandoSql, [nome]);
        console.log('model' + nome)
        return produto.rows;
    }
    
    async deletarProduto(id_peca) {
        const conexao = await conexaoBancoDeDados.conectar();
        const comandoSql = "DELETE FROM pecas WHERE id_peca = ($1)";
        const resp = await conexao.query(comandoSql, [id_peca]);
        return resp;
    }
    
    async editarProduto(nome, quantidade, preco, descricao, id_peca) {
        const conexao = await conexaoBancoDeDados.conectar();
        const comandoSql =
            "UPDATE pecas SET nome = ($1), quantidade = ($2), preco = ($3), descricao = ($4) WHERE id_peca = ($5)";
        return await conexao.query(comandoSql, [
            nome,
            quantidade,
            preco,
            descricao,
            id_peca
        ]);
    }
}

module.exports = new ProdutoModel();