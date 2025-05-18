const auth = require('../middlewares/auth');
const db = require('../config/db'); // conexão MySQL

// Rota para adicionar fornecedor
router.post('/fornecedores', auth, async (req, res) => {
  const { nome, preco } = req.body;

  if (!nome || !preco) {
    return res.status(400).json({ erro: 'Nome e preço são obrigatórios.' });
  }

  try {
    await db.query('INSERT INTO fornecedores (nome, preco) VALUES (?, ?)', [nome, preco]);
    res.status(201).json({ msg: 'Fornecedor cadastrado com sucesso!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao cadastrar fornecedor.' });
  }
});