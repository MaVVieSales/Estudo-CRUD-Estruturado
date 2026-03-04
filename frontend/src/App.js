// src/App.js
// Componente raiz: gerencia o estado global da aplicação
// Princípio: estado imutável — nunca modificado diretamente
//
// Padrão de imutabilidade aplicado:
//   - Adicionar: [...lista, novoItem]           (spread + novo item)
//   - Atualizar: lista.map(item => ...)         (map retorna nova lista)
//   - Remover:   lista.filter(item => ...)      (filter retorna nova lista)

import { useState, useEffect } from 'react';
import FormSolicitacao from './components/FormSolicitacao';
import ListaSolicitacoes from './components/ListaSolicitacoes';
import {
  listarSolicitacoes,
  criarSolicitacao,
  atualizarStatus,
  deletarSolicitacao
} from './services/api';
import './App.css';

function App() {
  // Lista de solicitações — NUNCA modificada diretamente
  const [solicitacoes, setSolicitacoes] = useState([]);

  // Estado de carregamento global — desabilita ações durante chamadas à API
  const [carregando, setCarregando] = useState(false);

  // Mensagem de feedback para o usuário (sucesso ou erro)
  const [mensagem, setMensagem] = useState(null); // { tipo: 'sucesso'|'erro', texto: '' }

  // Carrega as solicitações ao montar o componente
  useEffect(() => {
    carregarSolicitacoes();
  }, []);

  // Exibe uma mensagem por 4 segundos e depois remove
  function exibirMensagem(tipo, texto) {
    setMensagem({ tipo, texto });
    setTimeout(() => setMensagem(null), 4000);
  }

  // Busca todas as solicitações da API e atualiza o estado
  async function carregarSolicitacoes() {
    setCarregando(true);
    try {
      const dados = await listarSolicitacoes();
      setSolicitacoes(dados); // substitui estado — sem mutação
    } catch (erro) {
      exibirMensagem('erro', 'Erro ao carregar solicitações. Verifique se a API está rodando.');
    } finally {
      setCarregando(false);
    }
  }

  // Cria nova solicitação e adiciona à lista SEM recarregar tudo da API
  async function handleCriar(dados) {
    setCarregando(true);
    try {
      const nova = await criarSolicitacao(dados);

      // Imutabilidade: cria NOVO array com a nova solicitação no início
      setSolicitacoes(prev => [nova, ...prev]);

      exibirMensagem('sucesso', `Solicitação de ${nova.nome} criada com sucesso!`);
      return true; // sinaliza sucesso para o formulário limpar os campos
    } catch (erro) {
      const msg = erro.response?.data?.mensagem || 'Erro ao criar solicitação';
      exibirMensagem('erro', msg);
      return false;
    } finally {
      setCarregando(false);
    }
  }

  // Atualiza o status de uma solicitação existente
  async function handleAtualizarStatus(id, novoStatus) {
    setCarregando(true);
    try {
      const atualizada = await atualizarStatus(id, novoStatus);

      // Imutabilidade: map retorna NOVO array substituindo apenas o item alterado
      setSolicitacoes(prev =>
        prev.map(s => s.id === id ? atualizada : s)
      );

      exibirMensagem('sucesso', `Status atualizado para ${novoStatus}`);
    } catch (erro) {
      const msg = erro.response?.data?.mensagem || 'Erro ao atualizar status';
      exibirMensagem('erro', msg);
    } finally {
      setCarregando(false);
    }
  }

  // Remove uma solicitação após confirmação do usuário
  async function handleDeletar(id, nome) {
    if (!window.confirm(`Deseja remover a solicitação de ${nome}?`)) return;

    setCarregando(true);
    try {
      await deletarSolicitacao(id);

      // Imutabilidade: filter retorna NOVO array sem o item removido
      setSolicitacoes(prev => prev.filter(s => s.id !== id));

      exibirMensagem('sucesso', `Solicitação de ${nome} removida com sucesso`);
    } catch (erro) {
      const msg = erro.response?.data?.mensagem || 'Erro ao remover solicitação';
      exibirMensagem('erro', msg);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="app">
      <header className="header">
        <h1>💳 Sistema de Solicitações de Crédito</h1>
        <p>Gerencie as solicitações de crédito dos clientes</p>
      </header>

      <main className="container">
        {/* Mensagem de feedback */}
        {mensagem && (
          <div className={`alerta alerta-${mensagem.tipo}`}>
            {mensagem.texto}
          </div>
        )}

        {/* Indicador de carregamento */}
        {carregando && (
          <div className="carregando">⏳ Processando...</div>
        )}

        {/* Formulário de criação */}
        <FormSolicitacao
          onCriar={handleCriar}
          carregando={carregando}
        />

        {/* Lista de solicitações */}
        <ListaSolicitacoes
          solicitacoes={solicitacoes}
          onAtualizarStatus={handleAtualizarStatus}
          onDeletar={handleDeletar}
          carregando={carregando}
        />
      </main>

      <footer className="footer">
        <p>Sistema de Crédito — Projeto de Estudo Full Stack</p>
      </footer>
    </div>
  );
}

export default App;
