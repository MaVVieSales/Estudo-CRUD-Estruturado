// src/models/solicitacaoModel.js
// CAMADA MODEL: responsável exclusivamente pelo acesso ao banco de dados
// Nenhuma outra camada deve acessar o banco diretamente

const { pool } = require('../config/database');

const SolicitacaoModel = {

  // Busca todas as solicitações ordenadas por data de criação (mais recentes primeiro)
  async findAll() {
    const [rows] = await pool.execute(
      'SELECT * FROM solicitacoes ORDER BY dataCriacao DESC'
    );
    return rows;
  },

  // Busca uma solicitação pelo ID
  async findById(id) {
    const [rows] = await pool.execute(
      'SELECT * FROM solicitacoes WHERE id = ?',
      [id]
    );
    // Retorna o primeiro resultado ou undefined se não encontrado
    return rows[0];
  },

  // Insere uma nova solicitação
  // Status sempre inicia como EM_ANALISE (regra de negócio garantida aqui e no banco)
  async create({ nome, cpf, valorSolicitado, qtdParcelas }) {
    const [result] = await pool.execute(
      `INSERT INTO solicitacoes (nome, cpf, valorSolicitado, qtdParcelas, status)
       VALUES (?, ?, ?, ?, 'EM_ANALISE')`,
      [nome, cpf, valorSolicitado, qtdParcelas]
    );

    // Busca o registro recém-criado para retornar o objeto completo (com dataCriacao, status, etc.)
    return this.findById(result.insertId);
  },

  // Atualiza apenas o status (única atualização permitida após criação)
  async updateStatus(id, status) {
    const [result] = await pool.execute(
      'UPDATE solicitacoes SET status = ? WHERE id = ?',
      [status, id]
    );

    // affectedRows = 0 significa que o ID não existe
    if (result.affectedRows === 0) return null;

    return this.findById(id);
  },

  // Remove uma solicitação pelo ID
  async delete(id) {
    const [result] = await pool.execute(
      'DELETE FROM solicitacoes WHERE id = ?',
      [id]
    );

    // Retorna true se deletou, false se não encontrou
    return result.affectedRows > 0;
  }
};

module.exports = SolicitacaoModel;
