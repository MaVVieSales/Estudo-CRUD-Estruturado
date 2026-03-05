# 🗄️ Guia de Modelagem de Banco de Dados

> Este documento apresenta conceitos fundamentais de modelagem de banco de dados relacional, incluindo normalização, chaves, relacionamentos e boas práticas.

---

## Índice

1. [O que é Modelagem de Dados](#o-que-é-modelagem-de-dados)
2. [Bancos Relacionais](#bancos-relacionais)
3. [Estrutura de uma Tabela](#estrutura-de-uma-tabela)
4. [Chaves](#chaves)
5. [Tipos de Relacionamento](#tipos-de-relacionamento)
6. [Normalização](#normalização)
7. [Tipos de Dados Comuns](#tipos-de-dados-comuns)
8. [Índices](#índices)
9. [Boas Práticas](#boas-práticas)

---

## O que é Modelagem de Dados

Modelagem é o processo de organizar informações de forma estruturada para armazenamento e consulta eficiente.

Objetivos:

- Evitar redundância de dados
- Garantir integridade das informações
- Facilitar consultas e manutenção

---

## Bancos Relacionais

Bancos relacionais organizam dados em **tabelas** compostas por linhas (registros) e colunas (atributos).

Exemplos populares:

| Banco | Uso comum |
|---|---|
| **MySQL** | Aplicações web em geral |
| **MariaDB** | Fork do MySQL, alta compatibilidade |
| **PostgreSQL** | Sistemas que exigem maior robustez |
| **SQLite** | Projetos locais e mobile |

---

## Estrutura de uma Tabela

Cada tabela representa uma entidade do sistema.

**Exemplo — tabela `usuarios`:**

| Coluna | Tipo |
|---|---|
| `id` | INT |
| `nome` | VARCHAR(255) |
| `email` | VARCHAR(255) |

```sql
CREATE TABLE usuarios (
  id    INT AUTO_INCREMENT PRIMARY KEY,
  nome  VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE
);
```

---

## Chaves

### Chave Primária (Primary Key)

Identifica cada registro de forma **única**. Não pode ser nula nem repetida.

```sql
id INT AUTO_INCREMENT PRIMARY KEY
```

### Chave Estrangeira (Foreign Key)

Relaciona uma tabela com outra, garantindo integridade referencial.

```sql
-- Tabela pedidos referencia usuarios
CREATE TABLE pedidos (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT NOT NULL,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);
```

> Se tentar inserir um `usuario_id` que não existe em `usuarios`, o banco retorna erro — isso é **integridade referencial**.

---

## Tipos de Relacionamento

### 1:1 (Um para Um)

Um registro de A se relaciona com exatamente um registro de B.

```
usuarios ──── perfis
(1 usuário tem 1 perfil)
```

### 1:N (Um para Muitos)

Um registro de A se relaciona com vários de B.

```
usuarios ──── pedidos
(1 usuário tem vários pedidos)
```

### N:N (Muitos para Muitos)

Vários registros de A se relacionam com vários de B. Exige **tabela intermediária**.

```
alunos ──── alunos_cursos ──── cursos
(1 aluno tem vários cursos, 1 curso tem vários alunos)
```

```sql
CREATE TABLE alunos_cursos (
  aluno_id  INT,
  curso_id  INT,
  PRIMARY KEY (aluno_id, curso_id),
  FOREIGN KEY (aluno_id) REFERENCES alunos(id),
  FOREIGN KEY (curso_id) REFERENCES cursos(id)
);
```

---

## Normalização

Normalização é o processo de organizar a estrutura do banco para **reduzir redundância** e **garantir consistência**.

### 1ª Forma Normal (1FN)

Não pode haver campos multivalorados — cada célula deve conter um único valor.

```
❌ telefones: "11999999, 11888888"
✅ tabela separada: telefones(usuario_id, numero)
```

### 2ª Forma Normal (2FN)

Todos os campos devem depender **completamente** da chave primária.

### 3ª Forma Normal (3FN)

Não pode haver **dependência transitiva** — atributos não-chave não podem depender de outros atributos não-chave.

```
❌ cidade depende de cep, e cep depende do id
✅ separar cep em tabela própria
```

---

## Exemplo de Modelo

**Tabela `solicitacoes`:**

| Campo | Tipo | Regra |
|---|---|---|
| `id` | INT | PK, auto increment |
| `nome` | VARCHAR(255) | NOT NULL |
| `cpf` | CHAR(11) | NOT NULL |
| `valorSolicitado` | DECIMAL(15,2) | maior que 0 |
| `qtdParcelas` | INT | maior que 0 |
| `status` | ENUM | `EM_ANALISE` / `APROVADO` / `NEGADO` |
| `dataCriacao` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |

```sql
CREATE TABLE solicitacoes (
  id               INT AUTO_INCREMENT PRIMARY KEY,
  nome             VARCHAR(255) NOT NULL,
  cpf              CHAR(11) NOT NULL,
  valorSolicitado  DECIMAL(15,2) NOT NULL,
  qtdParcelas      INT NOT NULL,
  status           ENUM('EM_ANALISE','APROVADO','NEGADO') DEFAULT 'EM_ANALISE',
  dataCriacao      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT chk_valor    CHECK (valorSolicitado > 0),
  CONSTRAINT chk_parcelas CHECK (qtdParcelas > 0)
);
```

---

## Tipos de Dados Comuns

| Tipo | Uso | Exemplo |
|---|---|---|
| `INT` | Números inteiros | `id`, `qtdParcelas` |
| `VARCHAR(n)` | Texto de tamanho variável | `nome`, `email` |
| `CHAR(n)` | Texto de tamanho fixo | `cpf` (sempre 11 dígitos) |
| `DECIMAL(p,s)` | Valores financeiros | `valorSolicitado` |
| `DATE` | Somente data | `dataNascimento` |
| `TIMESTAMP` | Data + hora | `dataCriacao` |
| `BOOLEAN` | Verdadeiro/falso | `ativo` |
| `ENUM` | Lista de valores fixos | `status` |

> Use `DECIMAL` para valores financeiros — nunca `FLOAT` ou `DOUBLE`, pois têm imprecisão.

---

## Índices

Índices melhoram a velocidade de busca em colunas consultadas com frequência.

```sql
-- Índice em CPF para buscas rápidas
CREATE INDEX idx_cpf ON solicitacoes(cpf);

-- Índice em status para filtros frequentes
CREATE INDEX idx_status ON solicitacoes(status);
```

> A chave primária já cria um índice automaticamente. Crie índices adicionais nas colunas mais usadas em `WHERE` e `JOIN`.

---

## Boas Práticas

- **Nomes claros e consistentes** — use `snake_case` ou `camelCase`, mas seja consistente
- **Evitar duplicação de dados** — normalizar em vez de repetir
- **Usar chaves estrangeiras** — garante integridade entre tabelas
- **Validar no banco e na aplicação** — constraints SQL são a última linha de defesa
- **Documentar o modelo** — um diagrama ER facilita o entendimento da equipe
- **Usar ENUM com moderação** — difícil de alterar depois; prefira tabela de domínio para listas que crescem

---

## Conclusão

Uma boa modelagem de banco de dados torna o sistema:

- Mais **rápido** — consultas eficientes com índices e estrutura bem pensada
- Mais **seguro** — constraints evitam dados inválidos
- Mais **fácil de manter** — estrutura clara reduz bugs e retrabalho
