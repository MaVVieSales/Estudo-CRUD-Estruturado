// src/server.js
// Ponto de entrada da aplicação
// Responsável por iniciar o servidor e testar a conexão com o banco

const app = require('./app');
const { testConnection } = require('./config/database');

const PORT = process.env.PORT || 3001;

// Inicia o servidor apenas após confirmar conexão com o banco
async function iniciarServidor() {
  try {
    // Testa a conexão com o banco antes de abrir o servidor
    await testConnection();

    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
      console.log(`📋 Ambiente: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🔗 Health check: http://localhost:${PORT}/health`);
      console.log(`📦 API: http://localhost:${PORT}/solicitacoes`);
    });
  } catch (error) {
    console.error('❌ Falha ao iniciar o servidor:', error.message);
    process.exit(1);
  }
}

iniciarServidor();
