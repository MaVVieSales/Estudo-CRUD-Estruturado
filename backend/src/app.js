// src/app.js
// Configuração central do Express
// Separado do server.js para facilitar testes unitários

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const solicitacaoRoutes = require('./routes/solicitacaoRoutes');

const app = express();

// ============================================================
// MIDDLEWARES GLOBAIS
// ============================================================

// CORS: permite que o front-end (React em localhost:3000) acesse a API
// Em produção, substituir origin pelo domínio real
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));

// Parse automático do body em JSON
app.use(express.json());

// ============================================================
// ROTAS
// ============================================================

// Rota de health check — útil para verificar se o servidor está no ar
// Em AWS, o Load Balancer usa esse endpoint para checar a saúde da instância
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    ambiente: process.env.NODE_ENV || 'development'
  });
});

// Todas as rotas de solicitações estão prefixadas com /solicitacoes
app.use('/solicitacoes', solicitacaoRoutes);

// Middleware para rotas não encontradas (404 genérico)
app.use((req, res) => {
  res.status(404).json({ mensagem: 'Rota não encontrada' });
});

// Middleware global de tratamento de erros inesperados
// Deve ser o último middleware registrado
app.use((err, req, res, next) => {
  console.error('Erro não tratado:', err);
  res.status(500).json({
    mensagem: 'Erro interno do servidor',
    erro: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

module.exports = app;
