// src/server.js
require('dotenv').config();
require('./config/db'); // inicializa o banco
const api = require('./api'); // app configurado já com as rotas e middlewares

// Sobe o servidor
app.listen(4040, '0.0.0.0', () => {
  console.log('\nAPI INICIALIZADA!!');
});
