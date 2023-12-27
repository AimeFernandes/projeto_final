const conexaoBancoDeDados = require('../database/db_connection.js');


class PecaModel  {
    async addPeca(nome, preco, descricao, quantidade) {
        const conexao = await conexaoBancoDeDados.conectar();
        const sql = 
            "INSERT INTO pecas (nome, preco, descricao, quantidade) VALUES ($1, $2, $3, $4)";
        return await conexao.query(sql, [nome, preco, descricao, quantidade]);
    }
    
    async listarPecas() {
        const conexao = await conexaoBancoDeDados.conectar();
        const comandoSql = "SELECT * FROM pecas";
        const listaPecas = await conexao.query(comandoSql);
        return listaPecas.rows;
    }
    
    async buscarPecaPorId(id_peca) {
        const conexao = await conexaoBancoDeDados.conectar();
        const comandoSql = "SELECT * FROM pecas WHERE id_peca = ($1)";
        const peca = await conexao.query(comandoSql, [id_peca]);
        return peca.rows;
    }
    
    async buscarPecaPorNome(nome) {
        const conexao = await conexaoBancoDeDados.conectar();
        const comandoSql = "SELECT * FROM pecas WHERE nome ILIKE '%'||$1||'%'";
        const peca = await conexao.query(comandoSql, [nome]);
        //console.log('model' + nome)
        return peca.rows;
    }
    
    async deletarPeca(id_peca) {
        const conexao = await conexaoBancoDeDados.conectar();
        const comandoSql = "DELETE FROM pecas WHERE id_peca = ($1)";
        const resp = await conexao.query(comandoSql, [id_peca]);
        return resp;
    }
    
    async editarPeca(nome, preco, descricao, quantidade, id_peca) {
        const conexao = await conexaoBancoDeDados.conectar();

        const comandoSql = "UPDATE pecas SET nome = ($1), preco = ($2), descricao = ($3), quantidade = ($4) WHERE id_peca = ($5)";
        return await conexao.query(comandoSql, [
            nome,
            preco,
            descricao,
            quantidade,
            id_peca
        ]);
    }
}


module.exports = new PecaModel();