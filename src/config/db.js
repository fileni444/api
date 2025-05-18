const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

// Função para criar tabelas se não existirem
async function criarTabelas() {
  try {
    // Cria tabela clientes
    await db.query(`
      CREATE TABLE IF NOT EXISTS clientes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(100) NOT NULL,
        email VARCHAR(100),
        telefone VARCHAR(20),
        data_nascimento DATE,
        endereco TEXT,
        criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Tabela clientes criada ou já existe');

    // Cria tabela agendamentos
    await db.query(`
      CREATE TABLE IF NOT EXISTS agendamentos (
        id INT AUTO_INCREMENT PRIMARY KEY,
        cliente_id INT NOT NULL,
        data_agendamento DATETIME NOT NULL,
        procedimento VARCHAR(255) NOT NULL,
        status VARCHAR(50) DEFAULT 'pendente',
        FOREIGN KEY (cliente_id) REFERENCES clientes(id)
      )
    `);
    console.log('Tabela agendamentos criada ou já existe');

    // Cria tabela fornecedores
    await db.query(`
      CREATE TABLE IF NOT EXISTS fornecedores (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(255) NOT NULL,
        preco DECIMAL(10,2) NOT NULL
      )
    `);
    console.log('Tabela fornecedores criada ou já existe');

    // Cria tabela servicos
    await db.query(`
      CREATE TABLE IF NOT EXISTS servicos (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(255) NOT NULL,
        preco DECIMAL(10,2) NOT NULL
      )
    `);
    console.log('Tabela servicos criada ou já existe');

  } catch (err) {
    console.error('Erro ao criar tabelas:', err);
  }
}

// Executa a criação das tabelas
criarTabelas();

module.exports = db;
