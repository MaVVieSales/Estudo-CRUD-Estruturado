# 💳 Sistema de Solicitações de Crédito — Projeto Full Stack

Projeto desenvolvido para praticar conceitos fundamentais de desenvolvimento Full Stack, com foco em arquitetura de APIs REST, organização de código em camadas e integração entre Node.js, React e banco de dados relacional.

O sistema permite criar, listar, consultar, atualizar e remover solicitações de crédito, simulando um fluxo comum em sistemas financeiros.

Além da funcionalidade CRUD, o projeto foi estruturado para demonstrar boas práticas utilizadas em ambientes profissionais:

- Separação de responsabilidades em camadas
- Validação de dados no frontend e backend
- Uso de variáveis de ambiente para segurança
- Organização modular do código
- Preparação para deploy em cloud (AWS)

Este repositório serve como material de estudo, portfólio técnico e referência futura, permitindo revisitar conceitos importantes de desenvolvimento web.

---

## 🏗️ Arquitetura do Projeto

```
projeto-credito/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js
│   │   ├── routes/
│   │   │   └── solicitacaoRoutes.js
│   │   ├── controllers/
│   │   │   └── solicitacaoController.js
│   │   ├── services/
│   │   │   └── solicitacaoService.js
│   │   ├── models/
│   │   │   └── solicitacaoModel.js
│   │   ├── app.js
│   │   └── server.js
│   ├── database.sql
│   ├── .env.example
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── FormSolicitacao.js
    │   │   └── ListaSolicitacoes.js
    │   ├── services/
    │   │   └── api.js
    │   ├── App.js
    │   ├── App.css
    │   └── index.js
    ├── public/
    │   └── index.html
    ├── .env.example
    └── package.json
```

A aplicação segue uma arquitetura organizada em camadas:

- **Routes** → define os endpoints da API
- **Controllers** → recebem requisições HTTP e retornam respostas
- **Services** → concentram regras de negócio e validações
- **Models** → responsável pelo acesso ao banco de dados

Esse padrão facilita manutenção, testes e escalabilidade.

---

## 🛠️ Tecnologias Utilizadas

**Backend**
- Node.js
- Express
- MariaDB
- mysql2
- dotenv

**Frontend**
- React
- Axios
- CSS

**Ferramentas**
- Git
- npm
- VS Code

---

## 🚀 Como Rodar o Projeto

### Pré-requisitos

- Node.js 18+
- MariaDB ou MySQL
- npm

### 1. Banco de Dados

Execute o script SQL localizado em `backend/database.sql`:

```bash
mysql -u root -p < backend/database.sql
```

Isso criará o banco `credito_db`, a tabela `solicitacoes` e alguns registros de exemplo.

### 2. Backend

```bash
cd backend
npm install
cp .env.example .env
```

Configure as credenciais do banco no arquivo `.env` e inicie o servidor:

```bash
npm run dev
```

Servidor disponível em: `http://localhost:3001`

### 3. Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm start
```

Aplicação disponível em: `http://localhost:3000`

---

## 📋 Endpoints da API

| Método | Rota | Descrição |
|---|---|---|
| `POST` | `/solicitacoes` | Criar solicitação |
| `GET` | `/solicitacoes` | Listar todas |
| `GET` | `/solicitacoes/:id` | Buscar por ID |
| `PUT` | `/solicitacoes/:id` | Atualizar status |
| `DELETE` | `/solicitacoes/:id` | Remover |
| `GET` | `/health` | Health check |

---

## 📦 Modelo de Dados

**Tabela `solicitacoes`**

| Campo | Tipo | Regra |
|---|---|---|
| `id` | INT | PK, auto increment |
| `nome` | VARCHAR(255) | obrigatório |
| `cpf` | CHAR(11) | 11 dígitos |
| `valorSolicitado` | DECIMAL | maior que 0 |
| `qtdParcelas` | INT | maior que 0 |
| `status` | ENUM | `EM_ANALISE` / `APROVADO` / `NEGADO` |
| `dataCriacao` | TIMESTAMP | default `CURRENT_TIMESTAMP` |

---

## 🧠 Conceitos Demonstrados

Este projeto demonstra conceitos importantes para entrevistas técnicas:

- Arquitetura em camadas
- API REST
- Imutabilidade no React
- Tratamento de erros
- Validação de dados
- Uso de variáveis de ambiente
- Organização modular do código
- Boas práticas de versionamento com Git

---

## ☁️ Estrutura Preparada para Deploy

O projeto foi organizado considerando uma possível arquitetura em cloud:

| Componente | Serviço AWS |
|---|---|
| Backend | EC2 |
| Banco de dados | RDS (MariaDB) |
| Frontend | S3 + CloudFront |

---

## 🎯 Objetivo do Projeto

Este repositório foi criado como projeto de estudo e portfólio, com o objetivo de consolidar conhecimentos em desenvolvimento Full Stack e servir como material de revisão para entrevistas técnicas.
