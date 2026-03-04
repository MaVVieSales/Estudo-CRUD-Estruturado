// src/components/ListaSolicitacoes.js
// Componente de listagem: exibe todas as solicitações com ações de atualizar e deletar

// Mapa de cores para badges de status
const COR_STATUS = {
  EM_ANALISE: 'badge-amarelo',
  APROVADO: 'badge-verde',
  NEGADO: 'badge-vermelho'
};

// Label amigável para exibição
const LABEL_STATUS = {
  EM_ANALISE: '⏳ Em Análise',
  APROVADO: '✅ Aprovado',
  NEGADO: '❌ Negado'
};

// Formata valor em Real brasileiro
function formatarMoeda(valor) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(valor);
}

// Formata data ISO para formato brasileiro
function formatarData(dataISO) {
  return new Date(dataISO).toLocaleString('pt-BR');
}

function ListaSolicitacoes({ solicitacoes, onAtualizarStatus, onDeletar, carregando }) {
  // Lista vazia: exibe mensagem orientativa
  if (solicitacoes.length === 0) {
    return (
      <div className="card">
        <h2>Solicitações</h2>
        <p className="vazio">Nenhuma solicitação cadastrada. Crie a primeira acima!</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h2>Solicitações ({solicitacoes.length})</h2>

      {/* key={s.id} garante reconciliação correta pelo React */}
      {solicitacoes.map(s => (
        <div key={s.id} className="solicitacao-item">

          {/* Cabeçalho do card */}
          <div className="solicitacao-header">
            <div>
              <strong>#{s.id} — {s.nome}</strong>
              <span className="cpf"> | CPF: {s.cpf}</span>
            </div>
            <span className={`badge ${COR_STATUS[s.status]}`}>
              {LABEL_STATUS[s.status]}
            </span>
          </div>

          {/* Dados financeiros */}
          <div className="solicitacao-dados">
            <span>💰 {formatarMoeda(s.valorSolicitado)}</span>
            <span>📆 {s.qtdParcelas}x parcelas</span>
            <span>🕒 {formatarData(s.dataCriacao)}</span>
          </div>

          {/* Ações */}
          <div className="solicitacao-acoes">
            {/* Alterar status: apenas exibe opções diferentes do atual */}
            <select
              value={s.status}
              onChange={e => onAtualizarStatus(s.id, e.target.value)}
              disabled={carregando}
              className="select-status"
              aria-label={`Alterar status de ${s.nome}`}
            >
              <option value="EM_ANALISE">⏳ Em Análise</option>
              <option value="APROVADO">✅ Aprovado</option>
              <option value="NEGADO">❌ Negado</option>
            </select>

            <button
              onClick={() => onDeletar(s.id, s.nome)}
              className="btn btn-perigo"
              disabled={carregando}
            >
              🗑️ Remover
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ListaSolicitacoes;
