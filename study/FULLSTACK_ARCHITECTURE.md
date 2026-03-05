# 🏗️ Arquitetura Full Stack

> Este documento explica a arquitetura típica de aplicações Full Stack modernas, suas camadas, responsabilidades e fluxo de dados.

---

## Índice

1. [O que é Full Stack](#o-que-é-full-stack)
2. [Camadas da Aplicação](#camadas-da-aplicação)
3. [Fluxo de uma Requisição](#fluxo-de-uma-requisição)
4. [Arquitetura em Camadas no Backend](#arquitetura-em-camadas-no-backend)
5. [Deploy de Aplicações Full Stack](#deploy-de-aplicações-full-stack)
6. [Boas Práticas](#boas-práticas)

---

## O que é Full Stack

Full Stack refere-se ao desenvolvimento de **todas as camadas** de um sistema:

- **Frontend** — interface com o usuário
- **Backend** — lógica e regras de negócio
- **Banco de dados** — armazenamento persistente
- **Infraestrutura** — servidores, deploy e escalabilidade

Um desenvolvedor Full Stack consegue atuar em todas essas frentes, entendendo como elas se conectam.

---

## Camadas da Aplicação

### 🖥️ Frontend

Interface com o usuário. É tudo que o usuário vê e interage diretamente.

**Tecnologias comuns:**

| Tecnologia | Característica |
|---|---|
| **React** | Baseado em componentes, amplamente usado |
| **Vue.js** | Curva de aprendizado mais suave |
| **Angular** | Framework completo, usado em grandes empresas |

**Responsabilidades:**

- Renderização da interface
- Gerenciamento de estado (o que está sendo exibido)
- Validação de dados no cliente
- Requisições HTTP à API

---

### ⚙️ Backend

Responsável pela lógica da aplicação. É a "cozinha" do sistema — o usuário não vê, mas tudo passa por aqui.

**Tecnologias comuns:**

| Tecnologia | Linguagem |
|---|---|
| **Node.js + Express** | JavaScript |
| **Spring Boot** | Java |
| **Django / FastAPI** | Python |
| **Laravel** | PHP |

**Responsabilidades:**

- Regras de negócio
- Autenticação e autorização
- Validação de dados no servidor
- Comunicação com o banco de dados
- Integração com serviços externos

---

### 🗄️ Banco de Dados

Armazena os dados da aplicação de forma persistente.

**Relacionais (SQL):**
- MariaDB, MySQL, PostgreSQL

**Não relacionais (NoSQL):**
- MongoDB (documentos), Redis (cache), Firebase

---

## Fluxo de uma Requisição

Exemplo: usuário clica em "Criar Solicitação"

```
1. Usuário preenche formulário no frontend
         │
         │ axios.post('/solicitacoes', dados)
         ▼
2. Frontend envia requisição HTTP para o backend
         │
         │ POST /solicitacoes  { nome, cpf, valor }
         ▼
3. Backend recebe, valida e processa os dados
         │
         │ INSERT INTO solicitacoes ...
         ▼
4. Backend consulta o banco de dados
         │
         │ { id: 1, status: "EM_ANALISE", ... }
         ▼
5. Backend retorna resposta JSON (HTTP 201)
         │
         │ setSolicitacoes([nova, ...prev])
         ▼
6. Frontend atualiza a interface com os novos dados
```

---

## Arquitetura em Camadas no Backend

Uma das estruturas mais usadas em APIs Node.js com Express:

```
Requisição HTTP
      │
      ▼
   Routes
  (define os endpoints)
      │
      ▼
  Controllers
  (recebe req/res, chama o service)
      │
      ▼
   Services
  (regras de negócio e validações)
      │
      ▼
    Models
  (acesso ao banco de dados)
      │
      ▼
   Database
  (MariaDB / PostgreSQL)
```

### Responsabilidade de cada camada

| Camada | Responsabilidade | Exemplo |
|---|---|---|
| **Routes** | Define endpoints e métodos HTTP | `router.post('/', Controller.criar)` |
| **Controller** | Recebe req/res, delega ao service | `res.status(201).json(nova)` |
| **Service** | Regras de negócio, validações | Valida CPF, verifica valor > 0 |
| **Model** | Único ponto de acesso ao banco | `pool.execute('INSERT INTO ...')` |

### Por que usar essa estrutura?

- **Separação de responsabilidades** — cada arquivo faz uma coisa só
- **Manutenção mais fácil** — mudança na lógica afeta só o Service
- **Testes mais simples** — cada camada pode ser testada isoladamente
- **Escalabilidade** — time maior consegue trabalhar em paralelo

> **Regra fundamental:** nenhuma camada pula outra. O Controller nunca acessa o banco diretamente.

---

## Deploy de Aplicações Full Stack

Aplicações modernas geralmente utilizam infraestrutura em nuvem.

### Arquitetura típica na AWS

```
Usuário
   │
   ▼
CloudFront (CDN)
   │
   ├──→ S3 (Frontend React — arquivos estáticos)
   │
   └──→ EC2 (Backend Node.js)
              │
              ▼
            RDS (Banco de dados MariaDB)
```

### Serviços por camada

| Camada | AWS | Alternativas |
|---|---|---|
| **Frontend** | S3 + CloudFront | Vercel, Netlify |
| **Backend** | EC2 | Heroku, Railway |
| **Banco** | RDS | PlanetScale, Supabase |

### Ambientes comuns

```
Local (dev) → Staging (homologação) → Produção
```

Nunca testar direto em produção. O ambiente de staging replica a produção para validação final antes do lançamento.

---

## Boas Práticas

**Nunca misturar responsabilidades**
Frontend cuida da interface. Backend cuida da lógica. Banco cuida dos dados.

**Validar em todas as camadas**
Frontend valida para UX rápida. Backend valida por segurança. Banco valida como última linha de defesa.

**Usar variáveis de ambiente**
Credenciais de banco, chaves de API e configurações sensíveis ficam no `.env` — nunca no código.

**Versionar com Git desde o início**
Commit frequente com mensagens descritivas. Branches para novas funcionalidades.

**Documentar a API**
Uma boa documentação de endpoints facilita o trabalho em equipe e futuras integrações.

---

## Conclusão

Arquiteturas Full Stack modernas priorizam:

- **Separação de responsabilidades** — cada camada com sua função
- **Escalabilidade** — estrutura que cresce junto com a aplicação
- **Segurança** — validação e proteção em todas as camadas
- **Manutenção simples** — código organizado e documentado

Esses princípios permitem que aplicações cresçam de forma sustentável e que times maiores trabalhem sem conflitos.
