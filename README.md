# 💳 Sistema de Solicitações de Crédito — Projeto de Estudo Full Stack

Projeto completo para praticar CRUD, API REST, React e Node.js com foco em entrevista técnica.

---

## 🏗️ Arquitetura do Projeto

```
projeto-credito/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js          ← Conexão com MariaDB (pool)
│   │   ├── routes/
│   │   │   └── solicitacaoRoutes.js ← Definição dos endpoints REST
│   │   ├── controllers/
│   │   │   └── solicitacaoController.js ← Recebe HTTP, devolve resposta
│   │   ├── services/
│   │   │   └── solicitacaoService.js    ← Regras de negócio e validação
│   │   ├── models/
│   │   │   └── solicitacaoModel.js      ← Acesso ao banco (único lugar)
│   │   ├── app.js                   ← Configuração do Express
│   │   └── server.js                ← Ponto de entrada
│   ├── database.sql                 ← Script de criação do banco
│   ├── .env.example                 ← Variáveis de ambiente
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── FormSolicitacao.js   ← Formulário de criação
    │   │   └── ListaSolicitacoes.js ← Listagem com ações
    │   ├── services/
    │   │   └── api.js               ← Chamadas Axios à API
    │   ├── App.js                   ← Estado global + handlers
    │   ├── App.css                  ← Estilos
    │   └── index.js                 ← Entry point React
    ├── public/
    │   └── index.html
    ├── .env.example
    └── package.json
```

---

## 🚀 Como Rodar o Projeto

### Pré-requisitos
- Node.js 18+
- MariaDB 10.2+ (ou MySQL 8+)
- npm

### 1. Banco de Dados
```bash
# Acesse o MariaDB e execute o script:
mysql -u root -p < backend/database.sql

# Ou dentro do cliente MySQL:
source /caminho/para/backend/database.sql
```

### 2. Backend
```bash
cd backend

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env
# Edite o .env com suas credenciais do banco

# Inicie o servidor
npm run dev    # desenvolvimento (com nodemon)
npm start      # produção
```
Servidor rodará em: **http://localhost:3001**

### 3. Frontend
```bash
cd frontend

# Instale as dependências
npm install

# Configure a URL da API (opcional se usar proxy)
cp .env.example .env

# Inicie o React
npm start
```
Aplicação abrirá em: **http://localhost:3000**

---

## 📋 Endpoints da API REST

| Método | Rota                    | Descrição              | HTTP Success |
|--------|-------------------------|------------------------|--------------|
| POST   | /solicitacoes           | Criar solicitação      | 201 Created  |
| GET    | /solicitacoes           | Listar todas           | 200 OK       |
| GET    | /solicitacoes/:id       | Buscar por ID          | 200 OK       |
| PUT    | /solicitacoes/:id       | Atualizar status       | 200 OK       |
| DELETE | /solicitacoes/:id       | Remover                | 200 OK       |
| GET    | /health                 | Health check           | 200 OK       |

### Exemplos com curl

```bash
# Criar solicitação
curl -X POST http://localhost:3001/solicitacoes \
  -H "Content-Type: application/json" \
  -d '{"nome":"Maria Santos","cpf":"12345678901","valorSolicitado":5000,"qtdParcelas":12}'

# Listar todas
curl http://localhost:3001/solicitacoes

# Buscar por ID
curl http://localhost:3001/solicitacoes/1

# Atualizar status
curl -X PUT http://localhost:3001/solicitacoes/1 \
  -H "Content-Type: application/json" \
  -d '{"status":"APROVADO"}'

# Deletar
curl -X DELETE http://localhost:3001/solicitacoes/1
```

---

## 📦 Modelo de Dados

### Tabela `solicitacoes`
| Campo           | Tipo              | Regras                         |
|-----------------|-------------------|--------------------------------|
| id              | INT AUTO_INCREMENT| PK, gerado automaticamente     |
| nome            | VARCHAR(255)      | NOT NULL                       |
| cpf             | CHAR(11)          | NOT NULL, exatamente 11 dígitos|
| valorSolicitado | DECIMAL(15,2)     | NOT NULL, > 0                  |
| qtdParcelas     | INT               | NOT NULL, > 0                  |
| status          | ENUM              | EM_ANALISE / APROVADO / NEGADO |
| dataCriacao     | TIMESTAMP         | DEFAULT CURRENT_TIMESTAMP      |

### JSON de Criação (POST)
```json
{
  "nome": "Maria Santos",
  "cpf": "12345678901",
  "valorSolicitado": 5000.00,
  "qtdParcelas": 12
}
```

### JSON de Resposta
```json
{
  "id": 1,
  "nome": "Maria Santos",
  "cpf": "12345678901",
  "valorSolicitado": 5000.00,
  "qtdParcelas": 12,
  "status": "EM_ANALISE",
  "dataCriacao": "2026-03-04T10:00:00.000Z"
}
```

---

## 🧠 Conceitos para Entrevista

### Imutabilidade no React
```javascript
// ❌ ERRADO — mutação direta do estado
solicitacoes.push(nova);
setSolicitacoes(solicitacoes);

// ✅ CORRETO — cria novo array
setSolicitacoes(prev => [nova, ...prev]);          // adicionar
setSolicitacoes(prev => prev.map(s => s.id === id ? atualizada : s)); // atualizar
setSolicitacoes(prev => prev.filter(s => s.id !== id));               // remover
```

### Camadas do Backend
- **Routes**: define URLs e métodos HTTP
- **Controller**: recebe req/res, chama service, retorna JSON
- **Service**: regras de negócio, validações, lança erros semânticos
- **Model**: única camada que acessa o banco de dados

### Códigos HTTP
- `200` OK — leitura e atualização bem-sucedidas
- `201` Created — criação bem-sucedida
- `400` Bad Request — dados inválidos
- `404` Not Found — recurso não existe
- `500` Internal Server Error — erro inesperado no servidor

### Pool de Conexões
Evita criar/destruir conexões a cada requisição. Reutiliza conexões abertas, limitando o máximo simultâneo (ex: 10).

---

## ☁️ Deploy AWS (Estrutura Preparada)

| Componente  | Serviço AWS       | Observação                              |
|-------------|-------------------|-----------------------------------------|
| Backend     | EC2 (t3.micro)    | Node.js + PM2 para manter processo vivo |
| Banco       | RDS (MariaDB)     | Alterar DB_HOST no .env                 |
| Frontend    | S3 + CloudFront   | `npm run build` → upload do /build      |

Para subir o backend em produção, apenas mude o `.env`:
```env
DB_HOST=meu-banco.xxxxxxxx.us-east-1.rds.amazonaws.com
NODE_ENV=production
```

---

## ✅ Checklist de Boas Práticas

- [x] Separação em camadas (routes → controller → service → model)
- [x] Variáveis de ambiente para dados sensíveis
- [x] Validação no frontend E no backend
- [x] Estado React imutável (spread, map, filter)
- [x] Pool de conexões com o banco
- [x] Códigos HTTP semânticos
- [x] Tratamento de erros em todas as camadas
- [x] CORS configurado
- [x] Health check endpoint
- [x] Comentários explicativos no código
