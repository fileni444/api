// src/controllers/agendamentosController.js
const connection = require('../config/db');

// Criar um novo agendamento
const createAgendamento = (req, res) => {
  const { cliente_id, data_agendamento, procedimento } = req.body;
  
  // Verificar se todos os campos necessários foram enviados
  if (!cliente_id || !data_agendamento || !procedimento) {
    return res.status(400).json({ error: 'Cliente, data de agendamento e procedimento são obrigatórios!' });
  }

  connection.query(
    'INSERT INTO agendamentos (cliente_id, data_agendamento, procedimento) VALUES (?, ?, ?)',
    [cliente_id, data_agendamento, procedimento],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({
        id: result.insertId,
        cliente_id,
        data_agendamento,
        procedimento,
        status: 'pendente'
      });
    }
  );
};

// Listar todos os agendamentos
const getAgendamentos = (req, res) => {
  connection.query('SELECT * FROM agendamentos', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Buscar agendamento por ID
const getAgendamentoById = (req, res) => {
  const { id } = req.params;
  connection.query('SELECT * FROM agendamentos WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'Agendamento não encontrado' });
    res.json(results[0]);
  });
};

// Atualizar o status de um agendamento
const updateAgendamento = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;  // "pendente", "confirmado", "cancelado"
  
  connection.query(
    'UPDATE agendamentos SET status = ? WHERE id = ?',
    [status, id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Status do agendamento atualizado com sucesso' });
    }
  );
};

// Deletar um agendamento
const deleteAgendamento = (req, res) => {
  const { id } = req.params;
  connection.query('DELETE FROM agendamentos WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Agendamento removido com sucesso' });
  });
};

module.exports = {
  createAgendamento,
  getAgendamentos,
  getAgendamentoById,
  updateAgendamento,
  deleteAgendamento
};
