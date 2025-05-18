const express = require('express');
const path = require('path');
const cors = require('cors');           // <-- Importa cors
const api = express();
const routers = require('./routers/routers');

// Middleware para parsear URL-encoded e JSON
api.use(express.urlencoded({ extended: false }));
api.use(express.json());

// Ativa CORS para todas as origens (libera geral)
api.use(cors());

// Servir arquivos estáticos da pasta "public"
api.use(express.static(path.join(__dirname, '..', 'public')));

// Usar rotas
api.use('/', routers);

module.exports = api;
