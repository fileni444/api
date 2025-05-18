const connection = require('../config/db');

// Listar todos os clientes
const getClientes = (req, res) => {
  connection.query('SELECT * FROM clientes', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Buscar cliente por ID
const getClienteById = (req, res) => {
  const { id } = req.params;
  connection.query('SELECT * FROM clientes WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'Cliente não encontrado' });
    res.json(results[0]);
  });
};

// Criar novo cliente
const createCliente = (req, res) => {
  const { nome, email, telefone, data_nascimento, endereco } = req.body;
  
  // Validação simples
  if (!nome || !email) {
    return res.status(400).json({ error: 'Nome e email são obrigatórios!' });
  }

  connection.query(
    'INSERT INTO clientes (nome, email, telefone, data_nascimento, endereco) VALUES (?, ?, ?, ?, ?)',
    [nome, email, telefone, data_nascimento, endereco],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({
        id: result.insertId,
        nome,
        email,
        telefone,
        data_nascimento,
        endereco
      });
    }
  );
};

// Atualizar cliente
const updateCliente = (req, res) => {
  const { id } = req.params;
  const { nome, email, telefone, data_nascimento, endereco } = req.body;

  connection.query(
    'UPDATE clientes SET nome = ?, email = ?, telefone = ?, data_nascimento = ?, endereco = ? WHERE id = ?',
    [nome, email, telefone, data_nascimento, endereco, id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Cliente atualizado com sucesso' });
    }
  );
};

// Deletar cliente
const deleteCliente = (req, res) => {
  const { id } = req.params;
  connection.query('DELETE FROM clientes WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Cliente removido com sucesso' });
  });
};

module.exports = {
  getClientes,
  getClienteById,
  createCliente,
  updateCliente,
  deleteCliente
};
