// src/services/api.js
// Camada de serviço: centraliza todas as chamadas à API REST
// Mantém o App.js e componentes limpos de detalhes de HTTP

import axios from 'axios';

// Base URL vinda da variável de ambiente
// Em produção (AWS), apontar para o IP/domínio do EC2
const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

// Instância configurada do axios com timeout e headers padrão
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 10 segundos — evita requisições travadas
  headers: {
    'Content-Type': 'application/json'
  }
});

// ============================================================
// FUNÇÕES DE ACESSO À API
// Cada função corresponde a um endpoint REST
// ============================================================

// GET /solicitacoes — lista todas
export async function listarSolicitacoes() {
  const response = await api.get('/solicitacoes');
  return response.data;
}

// GET /solicitacoes/:id — busca por ID
export async function buscarSolicitacao(id) {
  const response = await api.get(`/solicitacoes/${id}`);
  return response.data;
}

// POST /solicitacoes — cria nova solicitação
// Recebe: { nome, cpf, valorSolicitado, qtdParcelas }
export async function criarSolicitacao(dados) {
  const response = await api.post('/solicitacoes', dados);
  return response.data;
}

// PUT /solicitacoes/:id — atualiza o status
// Recebe: { status: 'APROVADO' | 'NEGADO' | 'EM_ANALISE' }
export async function atualizarStatus(id, status) {
  const response = await api.put(`/solicitacoes/${id}`, { status });
  return response.data;
}

// DELETE /solicitacoes/:id — remove uma solicitação
export async function deletarSolicitacao(id) {
  const response = await api.delete(`/solicitacoes/${id}`);
  return response.data;
}
