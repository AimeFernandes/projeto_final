const pg = require('pg');
const dotenv = require("dotenv")
dotenv.config()

async function conectar() {
  const pool = new pg.Pool({  //Conexão com o banco de dados postgres
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT
  });
  const conexaoBancoDeDados = await pool.connect();
  console.log("Banco de dados conectado com sucesso!");

  return conexaoBancoDeDados;
}

module.exports = {conectar};