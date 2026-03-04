-- ============================================================
-- SCRIPT SQL - Criação do banco de dados e tabela
-- Compatível com MariaDB 10.x+
-- Execute este script antes de iniciar o servidor
-- ============================================================

-- Cria o banco se não existir
CREATE DATABASE IF NOT EXISTS credito_db
  CHARACTER SET utf8mb4        -- suporte completo a Unicode (emojis, acentos, etc.)
  COLLATE utf8mb4_unicode_ci;  -- ordenação case-insensitive

USE credito_db;

-- Remove a tabela se já existir (útil para reset em dev)
DROP TABLE IF EXISTS solicitacoes;

-- Criação da tabela principal
CREATE TABLE solicitacoes (
  -- Chave primária com auto incremento
  id INT NOT NULL AUTO_INCREMENT,
  
  -- Nome do solicitante: NOT NULL garante obrigatoriedade
  nome VARCHAR(255) NOT NULL,
  
  -- CPF: exatamente 11 dígitos numéricos (armazenado como string para preservar zeros à esquerda)
  cpf CHAR(11) NOT NULL,
  
  -- Valor solicitado: DECIMAL(15,2) para precisão financeira
  -- CHECK garante que apenas valores positivos sejam inseridos
  valorSolicitado DECIMAL(15, 2) NOT NULL,
  
  -- Quantidade de parcelas: inteiro positivo
  qtdParcelas INT NOT NULL,
  
  -- Status com ENUM: apenas os valores definidos são aceitos pelo banco
  -- DEFAULT garante que toda solicitação inicie como EM_ANALISE
  status ENUM('EM_ANALISE', 'APROVADO', 'NEGADO') NOT NULL DEFAULT 'EM_ANALISE',
  
  -- Data de criação: preenchida automaticamente pelo banco
  dataCriacao TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

  -- Definição da chave primária
  PRIMARY KEY (id),
  
  -- Índice no CPF para buscas rápidas
  INDEX idx_cpf (cpf),
  
  -- Índice no status para filtros frequentes
  INDEX idx_status (status),
  
  -- Constraints de validação (MariaDB 10.2.1+)
  CONSTRAINT chk_valorSolicitado CHECK (valorSolicitado > 0),
  CONSTRAINT chk_qtdParcelas CHECK (qtdParcelas > 0),
  CONSTRAINT chk_cpf CHECK (cpf REGEXP '^[0-9]{11}$')
  
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- DADOS DE EXEMPLO para desenvolvimento
-- ============================================================
INSERT INTO solicitacoes (nome, cpf, valorSolicitado, qtdParcelas, status) VALUES
  ('Maria Santos',   '12345678901', 5000.00, 12, 'EM_ANALISE'),
  ('João Oliveira',  '98765432100', 15000.00, 24, 'APROVADO'),
  ('Ana Costa',      '11122233344', 3000.00, 6,  'NEGADO');

-- Verificação final
SELECT 
  id,
  nome,
  cpf,
  valorSolicitado,
  qtdParcelas,
  status,
  dataCriacao
FROM solicitacoes;
