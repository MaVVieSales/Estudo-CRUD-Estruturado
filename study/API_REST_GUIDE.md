# 🌐 Guia de API REST

> Este documento descreve os princípios fundamentais de APIs REST, padrões de design, boas práticas e exemplos utilizados em aplicações modernas.

APIs REST são amplamente utilizadas para comunicação entre front-end, back-end e serviços externos.

---

## Índice

1. [O que é uma API](#o-que-é-uma-api)
2. [O que é REST](#o-que-é-rest)
3. [Princípios do REST](#princípios-do-rest)
4. [Métodos HTTP](#métodos-http)
5. [Exemplo de API CRUD](#exemplo-de-api-crud)
6. [Códigos HTTP](#códigos-http)
7. [Estrutura de Resposta](#estrutura-de-resposta)
8. [Boas Práticas](#boas-práticas)
9. [Segurança em APIs](#segurança-em-apis)

---

## O que é uma API

**API** significa *Application Programming Interface* — um conjunto de regras que permite que diferentes sistemas se comuniquem entre si.

```
Frontend (React) → requisição HTTP → Backend (Node.js) → consulta banco → resposta JSON
```

> Pense na API como um garçom: você (frontend) faz o pedido, ele leva à cozinha (backend) e traz o resultado de volta.

---

## O que é REST

**REST** significa *Representational State Transfer*. Foi descrito pelo cientista Roy Fielding em sua tese de doutorado em 2000 e define um conjunto de princípios arquiteturais para construir APIs escaláveis e desacopladas.

---

## Princípios do REST

### 1. Cliente–Servidor

Frontend e backend são independentes e se comunicam apenas por contratos definidos (endpoints).

```
Frontend → React
Backend  → Node.js / Express
```

### 2. Stateless

Cada requisição deve conter **todas as informações necessárias** para ser processada. O servidor não guarda estado entre requisições.

```http
GET /usuarios/1
Authorization: Bearer <token>
```

> Se o servidor precisasse "lembrar" quem você é, ele quebraria com múltiplas instâncias. Stateless resolve isso.

### 3. Recursos identificados por URL

Cada recurso possui um endpoint único e semântico:

```
/usuarios
/produtos
/solicitacoes
```

### 4. Representação dos dados

Dados são geralmente enviados e recebidos em **JSON**:

```json
{
  "id": 1,
  "nome": "Maria",
  "email": "maria@email.com"
}
```

---

## Métodos HTTP

| Método | Uso | Exemplo |
|---|---|---|
| `GET` | Buscar dados | `GET /usuarios` |
| `POST` | Criar recurso | `POST /usuarios` |
| `PUT` | Atualizar recurso completo | `PUT /usuarios/1` |
| `PATCH` | Atualização parcial | `PATCH /usuarios/1` |
| `DELETE` | Remover recurso | `DELETE /usuarios/1` |

> **Diferença entre PUT e PATCH:** PUT substitui o recurso inteiro. PATCH atualiza apenas os campos enviados.

---

## Exemplo de API CRUD

Recurso: `solicitacoes`

| Método | Endpoint | Ação |
|---|---|---|
| `GET` | `/solicitacoes` | Listar todas |
| `GET` | `/solicitacoes/:id` | Buscar por ID |
| `POST` | `/solicitacoes` | Criar |
| `PUT` | `/solicitacoes/:id` | Atualizar |
| `DELETE` | `/solicitacoes/:id` | Remover |

---

## Códigos HTTP

| Código | Significado | Quando usar |
|---|---|---|
| `200` | OK | Requisição bem-sucedida |
| `201` | Created | Recurso criado com sucesso |
| `400` | Bad Request | Dados inválidos enviados pelo cliente |
| `401` | Unauthorized | Não autenticado |
| `403` | Forbidden | Autenticado, mas sem permissão |
| `404` | Not Found | Recurso não existe |
| `500` | Internal Server Error | Erro inesperado no servidor |

---

## Estrutura de Resposta

Boa prática: respostas consistentes em todos os endpoints.

**Sucesso:**

```json
{
  "success": true,
  "data": {
    "id": 1,
    "nome": "Maria"
  }
}
```

**Erro:**

```json
{
  "success": false,
  "error": "CPF inválido"
}
```

---

## Boas Práticas

### Usar substantivos nas rotas

```bash
✅ /usuarios
❌ /getUsuarios
❌ /buscarUsuario
```

### Usar plural

```bash
✅ /usuarios
✅ /solicitacoes
❌ /usuario
```

### Versionar a API

Permite evoluir a API sem quebrar clientes existentes:

```bash
/api/v1/usuarios
/api/v2/usuarios
```

### Retornar códigos HTTP corretos

Não retornar `200` para tudo — use os códigos semânticos da tabela acima.

---

## Segurança em APIs

| Medida | Descrição |
|---|---|
| **HTTPS** | Criptografa o tráfego entre cliente e servidor |
| **JWT** | Token de autenticação sem estado (stateless) |
| **Validação de dados** | Nunca confiar nos dados enviados pelo cliente |
| **Rate Limiting** | Limita número de requisições por IP/tempo |
| **CORS** | Controla quais origens podem acessar a API |

---

## Conclusão

APIs REST permitem criar sistemas **escaláveis e desacoplados**. São usadas por praticamente todas as aplicações modernas — incluindo plataformas como Stripe, GitHub e Twitter.

Dominar REST é uma das habilidades mais cobradas em entrevistas de desenvolvimento web.
