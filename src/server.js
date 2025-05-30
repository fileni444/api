// src/server.js
require('dotenv').config();
require('./config/db'); // inicializa o banco
const api = require('./api'); // app configurado já com as rotas e middlewares

// Sobe o servidor
api.listen(process.env.PORT, () => {
  console.log('\nAPI INICIALIZADA!!');
});
