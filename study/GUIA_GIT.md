# 📚 Guia Completo de Versionamento com Git

> Material de estudo, referência rápida e registro permanente de conhecimento sobre versionamento de código com Git.

---

## Índice

1. [O que é Versionamento de Código](#o-que-é-versionamento-de-código)
2. [O que é Git](#o-que-é-git)
3. [Conceitos Fundamentais](#conceitos-fundamentais)
4. [Estrutura Interna do Git](#estrutura-interna-do-git)
5. [Comandos Essenciais](#comandos-essenciais)
6. [Fluxo de Trabalho Básico](#fluxo-de-trabalho-básico)
7. [Convenção de Mensagens de Commit](#convenção-de-mensagens-de-commit)
8. [Arquivo .gitignore](#arquivo-gitignore)
9. [Boas Práticas](#boas-práticas-com-git)
10. [Conflitos de Merge](#conflitos-de-merge)
11. [Plataformas de Hospedagem](#plataformas-de-hospedagem-de-código)

---

## O que é Versionamento de Código

Versionamento é o processo de registrar e acompanhar mudanças em arquivos ao longo do tempo.

Isso permite:

- Recuperar versões anteriores de um projeto
- Entender quem alterou cada parte do código
- Trabalhar em equipe sem sobrescrever o trabalho de outros
- Testar novas funcionalidades sem quebrar o sistema principal

Ferramentas de versionamento são essenciais em qualquer projeto de software.

---

## O que é Git

Git é um sistema de controle de versões **distribuído** — cada desenvolvedor possui uma cópia completa do repositório, incluindo todo o histórico do projeto.

Principais características:

- Histórico completo de alterações
- Suporte a múltiplas branches
- Trabalho offline
- Alta performance mesmo em projetos grandes

> Git é hoje o padrão da indústria para versionamento de código.

---

## Conceitos Fundamentais

### Repositório

Local onde o histórico do projeto é armazenado. Pode existir:

- **Localmente** — no computador do desenvolvedor
- **Remotamente** — em plataformas como GitHub, GitLab ou Bitbucket

---

### Commit

Um commit representa um registro de alterações no projeto. Cada commit contém:

- Mudanças realizadas
- Autor
- Data
- Mensagem explicando a alteração

```bash
feat: adiciona endpoint de criação de solicitações
```

> O histórico de commits funciona como uma linha do tempo do desenvolvimento.

---

### Branch

Uma branch é uma linha paralela de desenvolvimento. A branch principal normalmente se chama `main`.

Outras branches podem ser usadas para:

- Novas funcionalidades
- Correções de bugs
- Testes

```
feature/login
fix/correcao-cpf
```

> Branches permitem desenvolver sem afetar o código estável.

---

### Merge

O merge combina alterações de uma branch com outra.

```
feature/login → main
```

Após a funcionalidade estar pronta, ela é integrada ao código principal.

---

### Clone

Clone cria uma cópia local de um repositório remoto, baixando todo o histórico do projeto.

```bash
git clone https://github.com/usuario/projeto.git
```

---

## Estrutura Interna do Git

Git trabalha com três áreas principais:

| Área | Descrição |
|---|---|
| **Working Directory** | Arquivos que estão sendo editados |
| **Staging Area** | Área onde mudanças são preparadas para commit |
| **Repository** | Histórico permanente do projeto |

Fluxo básico:

```
editar arquivos
      ↓
   git add
      ↓
  git commit
```

---

## Comandos Essenciais

### Inicializar um repositório

```bash
git init
```

Cria um novo repositório Git na pasta atual.

---

### Verificar status

```bash
git status
```

Mostra arquivos modificados, adicionados e não rastreados.

---

### Adicionar arquivos ao stage

```bash
# Um arquivo específico
git add arquivo.js

# Todos os arquivos
git add .
```

---

### Criar um commit

```bash
git commit -m "mensagem do commit"
```

A mensagem deve explicar o que foi alterado e por quê.

---

### Ver histórico

```bash
git log
```

Mostra todos os commits do projeto.

---

### Enviar alterações para o repositório remoto

```bash
git push
```

---

### Atualizar repositório local

```bash
git pull
```

Baixa e integra alterações do repositório remoto.

---

## Fluxo de Trabalho Básico

Ciclo comum de desenvolvimento:

```bash
git status
git add .
git commit -m "descrição da alteração"
git push
```

---

## Convenção de Mensagens de Commit

Uma prática comum é usar prefixos padronizados:

| Prefixo | Significado |
|---|---|
| `feat` | Nova funcionalidade |
| `fix` | Correção de bug |
| `docs` | Atualização de documentação |
| `refactor` | Melhoria no código sem alterar comportamento |
| `style` | Mudanças de formatação |
| `test` | Adição ou alteração de testes |

**Exemplo:**

```bash
git commit -m "feat: adiciona endpoint de criação de solicitação"
```

---

## Arquivo .gitignore

O arquivo `.gitignore` define arquivos que não devem ser versionados.

```
node_modules/
.env
dist/
build/
```

Isso evita subir dependências, credenciais sensíveis e arquivos temporários.

---

## Boas Práticas com Git

**Fazer commits pequenos**
Commits devem representar uma mudança específica e isolada.

**Escrever boas mensagens**
Mensagens claras ajudam a entender o histórico do projeto.

**Não subir dados sensíveis**
Arquivos como `.env` devem sempre estar no `.gitignore`.

**Usar branches para novas funcionalidades**
Evita quebrar o código principal durante o desenvolvimento.

**Atualizar frequentemente**
Executar `git pull` antes de iniciar mudanças evita conflitos.

---

## Conflitos de Merge

Conflitos acontecem quando duas alterações modificam a mesma parte do código.

```
<<<<<<< HEAD
código da branch atual
=======
código da outra branch
>>>>>>> feature-login
```

O desenvolvedor deve escolher qual versão manter, editar o arquivo e fazer um novo commit.

---

## Plataformas de Hospedagem de Código

Git pode ser usado com plataformas online que oferecem recursos adicionais:

- Colaboração entre times
- Pull requests e revisão de código
- CI/CD (deploy automatizado)
- Gerenciamento de issues

As mais utilizadas:

| Plataforma | Link |
|---|---|
| **GitHub** | https://github.com |
| **GitLab** | https://gitlab.com |
| **Bitbucket** | https://bitbucket.org |

---

## Conclusão

Dominar versionamento com Git permite:

- Manter histórico confiável do projeto
- Colaborar com outros desenvolvedores
- Experimentar mudanças sem risco
- Manter organização no desenvolvimento

> Controle de versões é considerado uma habilidade essencial para qualquer desenvolvedor.
