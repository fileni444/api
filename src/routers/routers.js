const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const db = require('../config/db');
const auth = require('../middlewares/auth');

const {
  getClientes,
  getClienteById,
  createCliente,
  updateCliente,
  deleteCliente
} = require('../controllers/clientesController');

const {
  createAgendamento,
  getAgendamentos,
  getAgendamentoById,
  updateAgendamento,
  deleteAgendamento
} = require('../controllers/agendamentosController');

const router = express.Router();

// ========================
// ROTAS DE FORNECEDORES
// ========================

// Criar fornecedor (com produtos e preços)
router.post('/fornecedores', auth, async (req, res) => {
  const { nome, produtos, precos } = req.body;

  if (!nome || !produtos || !precos) {
    return res.status(400).json({ erro: 'Nome, produto e preço são obrigatórios.' });
  }

  try {
    await db.query('INSERT INTO fornecedores (nome, produtos, precos) VALUES (?, ?, ?)', [nome, produtos, precos]);
    res.status(201).json({ msg: 'Fornecedor cadastrado com sucesso!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao cadastrar fornecedor.' });
  }
});

// Buscar todos os fornecedores e seus produtos
router.get('/fornecedores-produtos', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT nome, produtos, precos FROM fornecedores');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao buscar produtos dos fornecedores' });
  }
});

// Buscar produtos de um fornecedor específico
router.get('/fornecedores/:nome', async (req, res) => {
  const { nome } = req.params;

  try {
    const [rows] = await db.query(
      'SELECT produtos, precos FROM fornecedores WHERE UPPER(nome) = UPPER(?)',
      [nome]
    );
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao buscar produtos do fornecedor' });
  }
});

// ========================
// ROTAS DE SERVIÇOS
// ========================

router.post('/servicos', auth, async (req, res) => {
  const { nome, preco } = req.body;

  if (!nome || !preco) {
    return res.status(400).json({ erro: 'Nome e preço são obrigatórios.' });
  }

  try {
    await db.query('INSERT INTO servicos (nome, preco) VALUES (?, ?)', [nome, preco]);
    res.status(201).json({ msg: 'Serviço cadastrado com sucesso!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao cadastrar serviço.' });
  }
});

// Buscar todos os serviços
router.get('/servicos-lista', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM servicos');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao buscar os serviços' });
  }
});

// Buscar serviços por dentistas
router.get('/servicos-dentistas', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT dentista, servico, preco FROM servicos_dentistas');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao buscar os dados' });
  }
});

// ========================
// AUTENTICAÇÃO FIXA
// ========================

const senhaHash = bcrypt.hashSync(process.env.USER_PASSWORD, 8);

const usuarioUnico = {
  id: 1,
  email: process.env.USER_EMAIL,
  senha: senhaHash,
};

router.post('/login', (req, res) => {
  const { email, senha } = req.body;

  if (email !== usuarioUnico.email) {
    return res.status(401).json({ erro: 'Usuário não encontrado' });
  }

  const senhaValida = bcrypt.compareSync(senha, usuarioUnico.senha);
  if (!senhaValida) return res.status(401).json({ erro: 'Senha inválida' });

  const token = jwt.sign({ id: usuarioUnico.id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  res.json({ auth: true, token });
});

// ========================
// ROTAS DE CLIENTES
// ========================

router.get('/clientes', auth, getClientes);
router.get('/clientes/:id', auth, getClienteById);
router.post('/clientes', auth, createCliente);
router.put('/clientes/:id', auth, updateCliente);
router.delete('/clientes/:id', auth, deleteCliente);

// ========================
// ROTAS DE AGENDAMENTOS
// ========================

router.post('/agendamentos', auth, createAgendamento);
router.get('/agendamentos', auth, getAgendamentos);
router.get('/agendamentos/:id', auth, getAgendamentoById);
router.put('/agendamentos/:id', auth, updateAgendamento);
router.delete('/agendamentos/:id', auth, deleteAgendamento);

module.exports = router;
