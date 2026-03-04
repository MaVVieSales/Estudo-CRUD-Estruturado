// src/services/solicitacaoService.js
// CAMADA SERVICE: responsável pelas regras de negócio e validações
// Fica entre o controller (HTTP) e o model (banco de dados)

const SolicitacaoModel = require('../models/solicitacaoModel');

// Status válidos conforme definição do sistema
const STATUS_VALIDOS = ['EM_ANALISE', 'APROVADO', 'NEGADO'];

const SolicitacaoService = {

  // Lista todas as solicitações
  async listarTodas() {
    return await SolicitacaoModel.findAll();
  },

  // Busca uma solicitação por ID com tratamento de "não encontrado"
  async buscarPorId(id) {
    const solicitacao = await SolicitacaoModel.findById(id);
    if (!solicitacao) {
      // Lança um erro com código HTTP para o controller tratar
      const erro = new Error('Solicitação não encontrada');
      erro.statusCode = 404;
      throw erro;
    }
    return solicitacao;
  },

  // Cria uma nova solicitação após validar todos os campos
  async criar(dados) {
    // Valida os dados antes de enviar ao banco
    this._validarDadosCriacao(dados);

    const { nome, cpf, valorSolicitado, qtdParcelas } = dados;

    return await SolicitacaoModel.create({
      nome: nome.trim(),
      cpf: cpf.trim(),
      valorSolicitado: parseFloat(valorSolicitado),
      qtdParcelas: parseInt(qtdParcelas)
    });
  },

  // Atualiza o status de uma solicitação existente
  async atualizarStatus(id, status) {
    // Verifica se o status informado é válido
    if (!STATUS_VALIDOS.includes(status)) {
      const erro = new Error(
        `Status inválido. Use: ${STATUS_VALIDOS.join(', ')}`
      );
      erro.statusCode = 400;
      throw erro;
    }

    // Verifica se a solicitação existe (lança 404 se não encontrar)
    await this.buscarPorId(id);

    return await SolicitacaoModel.updateStatus(id, status);
  },

  // Remove uma solicitação pelo ID
  async deletar(id) {
    // Verifica se existe antes de tentar deletar
    await this.buscarPorId(id);
    return await SolicitacaoModel.delete(id);
  },

  // ============================================================
  // MÉTODO PRIVADO: validação dos dados de criação
  // Convenção: prefixo _ indica uso interno da classe
  // ============================================================
  _validarDadosCriacao({ nome, cpf, valorSolicitado, qtdParcelas }) {
    const erros = [];

    // Validação do nome
    if (!nome || typeof nome !== 'string' || nome.trim().length === 0) {
      erros.push('Nome é obrigatório');
    }

    // Validação do CPF: exatamente 11 dígitos numéricos
    if (!cpf || !/^\d{11}$/.test(cpf.toString().trim())) {
      erros.push('CPF deve conter exatamente 11 dígitos numéricos');
    }

    // Validação do valor solicitado
    const valor = parseFloat(valorSolicitado);
    if (isNaN(valor) || valor <= 0) {
      erros.push('Valor solicitado deve ser um número maior que zero');
    }

    // Validação da quantidade de parcelas
    const parcelas = parseInt(qtdParcelas);
    if (isNaN(parcelas) || parcelas <= 0 || !Number.isInteger(parcelas)) {
      erros.push('Quantidade de parcelas deve ser um número inteiro maior que zero');
    }

    // Se houver erros, lança exceção com todos eles agrupados
    if (erros.length > 0) {
      const erro = new Error(erros.join('; '));
      erro.statusCode = 400;
      erro.detalhes = erros; // array com erros individuais para o front-end
      throw erro;
    }
  }
};

module.exports = SolicitacaoService;
