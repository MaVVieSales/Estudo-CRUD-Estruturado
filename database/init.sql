-- ============================================================
-- Script de criação do banco de dados para o sistema de
-- solicitações de crédito
-- Compatível com MariaDB / MySQL
-- ============================================================

-- Cria o banco se não existir
CREATE DATABASE IF NOT EXISTS credito_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE credito_db;

-- ============================================================
-- Tabela principal: solicitacoes
-- ============================================================
CREATE TABLE IF NOT EXISTS solicitacoes (
  id              INT             NOT NULL AUTO_INCREMENT,
  nome            VARCHAR(255)    NOT NULL,
  cpf             CHAR(11)        NOT NULL,                        -- Sempre 11 dígitos numéricos
  valorSolicitado DECIMAL(15, 2)  NOT NULL CHECK (valorSolicitado > 0),
  qtdParcelas     INT             NOT NULL CHECK (qtdParcelas > 0),
  status          ENUM(
                    'EM_ANALISE',
                    'APROVADO',
                    'NEGADO'
                  )               NOT NULL DEFAULT 'EM_ANALISE',
  dataCriacao     TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,

  -- Chave primária
  CONSTRAINT pk_solicitacoes PRIMARY KEY (id),

  -- Garantia de que o CPF tem exatamente 11 caracteres numéricos
  CONSTRAINT chk_cpf CHECK (cpf REGEXP '^[0-9]{11}$')
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================================
-- Índices para melhorar performance de consultas frequentes
-- ============================================================
CREATE INDEX idx_status      ON solicitacoes (status);
CREATE INDEX idx_cpf         ON solicitacoes (cpf);
CREATE INDEX idx_dataCriacao ON solicitacoes (dataCriacao);

-- ============================================================
-- Dados de exemplo para teste
-- ============================================================
INSERT INTO solicitacoes (nome, cpf, valorSolicitado, qtdParcelas, status) VALUES
  ('Maria Santos',   '12345678901', 5000.00, 12, 'EM_ANALISE'),
  ('João Oliveira',  '98765432100', 15000.00, 24, 'APROVADO'),
  ('Ana Costa',      '11122233344', 2500.50,  6,  'NEGADO');
