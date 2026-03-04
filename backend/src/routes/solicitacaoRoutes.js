// src/routes/solicitacaoRoutes.js
// CAMADA ROUTES: define os endpoints REST e os conecta aos controllers
// Padrão REST correto:
//   POST   /solicitacoes       → criar
//   GET    /solicitacoes       → listar todos
//   GET    /solicitacoes/:id   → buscar por id
//   PUT    /solicitacoes/:id   → atualizar status
//   DELETE /solicitacoes/:id   → remover

const express = require('express');
const router = express.Router();
const SolicitacaoController = require('../controllers/solicitacaoController');

// Rota de criação de nova solicitação
router.post('/', SolicitacaoController.criar);

// Rota de listagem de todas as solicitações
router.get('/', SolicitacaoController.listarTodas);

// Rota de busca por ID específico
router.get('/:id', SolicitacaoController.buscarPorId);

// Rota de atualização de status
router.put('/:id', SolicitacaoController.atualizarStatus);

// Rota de remoção
router.delete('/:id', SolicitacaoController.deletar);

module.exports = router;
