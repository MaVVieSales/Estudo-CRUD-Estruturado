// src/components/FormSolicitacao.js
// Componente de formulário para criar nova solicitação
// Valida os dados no front-end antes de enviar à API

import { useState } from 'react';

// Estado inicial: objeto vazio para reset fácil após envio
const ESTADO_INICIAL = {
  nome: '',
  cpf: '',
  valorSolicitado: '',
  qtdParcelas: ''
};

function FormSolicitacao({ onCriar, carregando }) {
  // Estado do formulário — nunca modificado diretamente
  const [form, setForm] = useState(ESTADO_INICIAL);

  // Estado de erros de validação por campo
  const [erros, setErros] = useState({});

  // Atualiza um campo do formulário usando spread operator (imutabilidade)
  function handleChange(e) {
    const { name, value } = e.target;
    // Spread cria novo objeto — não modifica o anterior
    setForm(prev => ({ ...prev, [name]: value }));

    // Limpa o erro do campo ao digitar
    if (erros[name]) {
      setErros(prev => ({ ...prev, [name]: '' }));
    }
  }

  // Validação local antes de enviar
  function validar() {
    const novosErros = {};

    if (!form.nome.trim()) {
      novosErros.nome = 'Nome é obrigatório';
    }

    if (!/^\d{11}$/.test(form.cpf.trim())) {
      novosErros.cpf = 'CPF deve conter exatamente 11 dígitos numéricos';
    }

    const valor = parseFloat(form.valorSolicitado);
    if (!form.valorSolicitado || isNaN(valor) || valor <= 0) {
      novosErros.valorSolicitado = 'Valor deve ser maior que zero';
    }

    const parcelas = parseInt(form.qtdParcelas);
    if (!form.qtdParcelas || isNaN(parcelas) || parcelas <= 0) {
      novosErros.qtdParcelas = 'Parcelas devem ser maior que zero';
    }

    setErros(novosErros);

    // Retorna true se não houver erros
    return Object.keys(novosErros).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // Interrompe se validação falhar
    if (!validar()) return;

    // Passa os dados para o App.js tratar (separação de responsabilidades)
    const sucesso = await onCriar({
      nome: form.nome.trim(),
      cpf: form.cpf.trim(),
      valorSolicitado: parseFloat(form.valorSolicitado),
      qtdParcelas: parseInt(form.qtdParcelas)
    });

    // Limpa o formulário apenas se a criação foi bem-sucedida
    if (sucesso) {
      setForm(ESTADO_INICIAL);
      setErros({});
    }
  }

  return (
    <div className="card">
      <h2>Nova Solicitação de Crédito</h2>
      <form onSubmit={handleSubmit} noValidate>

        {/* Campo Nome */}
        <div className="campo">
          <label htmlFor="nome">Nome completo *</label>
          <input
            id="nome"
            name="nome"
            type="text"
            value={form.nome}
            onChange={handleChange}
            placeholder="Ex: Maria Santos"
            className={erros.nome ? 'input-erro' : ''}
            disabled={carregando}
          />
          {erros.nome && <span className="erro-msg">{erros.nome}</span>}
        </div>

        {/* Campo CPF */}
        <div className="campo">
          <label htmlFor="cpf">CPF (somente números) *</label>
          <input
            id="cpf"
            name="cpf"
            type="text"
            value={form.cpf}
            onChange={handleChange}
            placeholder="Ex: 12345678901"
            maxLength={11}
            className={erros.cpf ? 'input-erro' : ''}
            disabled={carregando}
          />
          {erros.cpf && <span className="erro-msg">{erros.cpf}</span>}
        </div>

        {/* Campo Valor */}
        <div className="campo">
          <label htmlFor="valorSolicitado">Valor solicitado (R$) *</label>
          <input
            id="valorSolicitado"
            name="valorSolicitado"
            type="number"
            value={form.valorSolicitado}
            onChange={handleChange}
            placeholder="Ex: 5000.00"
            min="0.01"
            step="0.01"
            className={erros.valorSolicitado ? 'input-erro' : ''}
            disabled={carregando}
          />
          {erros.valorSolicitado && <span className="erro-msg">{erros.valorSolicitado}</span>}
        </div>

        {/* Campo Parcelas */}
        <div className="campo">
          <label htmlFor="qtdParcelas">Quantidade de parcelas *</label>
          <input
            id="qtdParcelas"
            name="qtdParcelas"
            type="number"
            value={form.qtdParcelas}
            onChange={handleChange}
            placeholder="Ex: 12"
            min="1"
            step="1"
            className={erros.qtdParcelas ? 'input-erro' : ''}
            disabled={carregando}
          />
          {erros.qtdParcelas && <span className="erro-msg">{erros.qtdParcelas}</span>}
        </div>

        <button type="submit" className="btn btn-primario" disabled={carregando}>
          {carregando ? 'Enviando...' : 'Criar Solicitação'}
        </button>
      </form>
    </div>
  );
}

export default FormSolicitacao;
