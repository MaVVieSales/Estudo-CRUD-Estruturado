// src/controllers/solicitacaoController.js
// CAMADA CONTROLLER: responsável por receber requisições HTTP,
// chamar o service e retornar respostas com os códigos corretos

const SolicitacaoService = require('../services/solicitacaoService');

const SolicitacaoController = {

  // GET /solicitacoes
  // Retorna todas as solicitações - 200 OK
  async listarTodas(req, res) {
    try {
      const solicitacoes = await SolicitacaoService.listarTodas();
      return res.status(200).json(solicitacoes);
    } catch (error) {
      return res.status(500).json({
        mensagem: 'Erro interno ao listar solicitações',
        erro: error.message
      });
    }
  },

  // GET /solicitacoes/:id
  // Retorna uma solicitação específica - 200 OK ou 404 Not Found
  async buscarPorId(req, res) {
    try {
      const { id } = req.params;
      const solicitacao = await SolicitacaoService.buscarPorId(id);
      return res.status(200).json(solicitacao);
    } catch (error) {
      const status = error.statusCode || 500;
      return res.status(status).json({ mensagem: error.message });
    }
  },

  // POST /solicitacoes
  // Cria uma nova solicitação - 201 Created ou 400 Bad Request
  async criar(req, res) {
    try {
      const novaSolicitacao = await SolicitacaoService.criar(req.body);
      return res.status(201).json(novaSolicitacao);
    } catch (error) {
      const status = error.statusCode || 500;
      return res.status(status).json({
        mensagem: error.message,
        // Retorna array de erros individuais se disponível (facilita exibição no front)
        detalhes: error.detalhes || undefined
      });
    }
  },

  // PUT /solicitacoes/:id
  // Atualiza o status de uma solicitação - 200 OK, 400 Bad Request ou 404 Not Found
  async atualizarStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (!status) {
        return res.status(400).json({ mensagem: 'Campo "status" é obrigatório' });
      }

      const atualizada = await SolicitacaoService.atualizarStatus(id, status);
      return res.status(200).json(atualizada);
    } catch (error) {
      const status = error.statusCode || 500;
      return res.status(status).json({ mensagem: error.message });
    }
  },

  // DELETE /solicitacoes/:id
  // Remove uma solicitação - 200 OK ou 404 Not Found
  async deletar(req, res) {
    try {
      const { id } = req.params;
      await SolicitacaoService.deletar(id);
      return res.status(200).json({ mensagem: 'Solicitação removida com sucesso' });
    } catch (error) {
      const status = error.statusCode || 500;
      return res.status(status).json({ mensagem: error.message });
    }
  }
};

module.exports = SolicitacaoController;
