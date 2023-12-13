const pg = require('pg');

async function conectar() {
  const pool = new pg.Pool({  //Conexão com o banco de dados postgres
    connectionString: `postgres://aluno_20201214010001:142783@177.136.201.182:5439/temp?schema=aluno_20201214010001`,
  });
  const conexaoBancoDeDados = await pool.connect();
  console.log("Banco de dados conectado com sucesso!");

  return conexaoBancoDeDados;
}

module.exports = {conectar};