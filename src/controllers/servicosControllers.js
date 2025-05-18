// Rota para adicionar serviço
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
