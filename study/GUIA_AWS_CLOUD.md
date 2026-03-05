# ☁️ Guia de Estudos — Cloud Computing e AWS

> Material de estudo para desenvolvedores iniciantes | Preparação para entrevistas técnicas

**Índice**
1. [Introdução ao Cloud Computing](#1-introdução-ao-cloud-computing)
2. [Modelos de Serviço](#2-modelos-de-serviço)
3. [O que é AWS](#3-o-que-é-aws)
4. [Serviços Principais da AWS](#4-serviços-principais-da-aws-para-desenvolvedores)
5. [Exemplo Prático de Arquitetura](#5-exemplo-prático-de-arquitetura)
6. [Fluxo Real de Deploy](#6-fluxo-real-de-deploy)
7. [Glossário](#7-glossário-de-termos-importantes)
8. [Perguntas de Entrevista](#8-perguntas-comuns-de-entrevista)
9. [Resumo para Revisão Rápida](#9-resumo-para-revisão-rápida)

---

## 1. Introdução ao Cloud Computing

### O que é computação em nuvem?

Cloud Computing (computação em nuvem) é o uso de servidores, armazenamento e outros recursos de computação **pela internet**, em vez de usar hardware físico na sua casa ou empresa.

Em termos simples: em vez de comprar um computador potente para rodar seu sistema, você **aluga** esse poder computacional de uma empresa especializada — e paga só pelo que usar.

> 💡 **Analogia:** É como a energia elétrica. Você não constrói uma usina para ter luz em casa — você liga na tomada e paga a conta no fim do mês. Com a nuvem, você "liga" seus sistemas na internet e paga pelo uso.

---

### Local vs. Nuvem — qual a diferença?

| Situação | Rodando localmente | Rodando na nuvem |
|---|---|---|
| **Onde fica o servidor?** | Na sua máquina ou empresa | Em data centers da AWS, Google, etc. |
| **Quem cuida do hardware?** | Você | A empresa de nuvem |
| **Custo inicial** | Alto (comprar servidores) | Baixo (paga pelo uso) |
| **Se travar às 3h da manhã** | Você acorda e resolve | A AWS resolve |
| **Escalar para mais usuários** | Comprar mais hardware | Alguns cliques |
| **Acesso** | Só na rede local | De qualquer lugar |

---

### Exemplos práticos do dia a dia

Você já usa a nuvem sem perceber:

- **Google Drive / OneDrive** — seus arquivos não ficam só no seu computador, ficam em servidores do Google/Microsoft
- **Netflix** — os filmes não estão no seu celular, são transmitidos de servidores na nuvem em tempo real
- **WhatsApp** — suas mensagens passam por servidores na nuvem antes de chegar ao destinatário
- **Spotify** — as músicas ficam nos servidores deles, não no seu telefone
- **GitHub** — seu código fica armazenado em servidores remotos

---

## 2. Modelos de Serviço

Existem três grandes modelos de serviço em cloud. A diferença entre eles é basicamente **quanto você gerencia e quanto a nuvem gerencia**.

```
Quanto VOCÊ gerencia:

IaaS  ████████████░░░░░░░░  Você gerencia quase tudo
PaaS  ████████░░░░░░░░░░░░  A nuvem cuida da infra
SaaS  ████░░░░░░░░░░░░░░░░  Você só usa o produto final
```

---

### IaaS — Infrastructure as a Service

**Infraestrutura como Serviço**

A empresa de nuvem fornece o hardware virtual (servidor, rede, armazenamento). Você instala e configura tudo por cima — sistema operacional, linguagem, banco de dados, etc.

**Analogia:** Você aluga um terreno e constrói a casa do jeito que quiser.

**Exemplos:**
- AWS EC2 (servidores virtuais)
- Google Compute Engine
- Microsoft Azure VMs

**Quando usar:** Quando você precisa de controle total sobre o ambiente. Comum em empresas que já têm equipe de infraestrutura.

---

### PaaS — Platform as a Service

**Plataforma como Serviço**

A nuvem já entrega um ambiente pronto para você desenvolver. Você não precisa se preocupar com sistema operacional, atualizações ou configuração de servidor — só escreve e sobe o código.

**Analogia:** Você aluga um apartamento já mobiliado. Traz suas roupas e começa a morar.

**Exemplos:**
- Heroku
- AWS Elastic Beanstalk
- Google App Engine
- Vercel / Netlify (para frontend)

**Quando usar:** Quando você quer foco total no código, sem se preocupar com infraestrutura.

---

### SaaS — Software as a Service

**Software como Serviço**

Você usa um software pronto pela internet, sem instalar nada. Não precisa gerenciar nem o código, nem a infraestrutura.

**Analogia:** Você se hospeda num hotel. Não precisa se preocupar com nada — só usar.

**Exemplos:**
- Gmail, Google Docs
- Slack, Notion, Figma
- Salesforce
- GitHub (para o usuário final)

**Quando usar:** Quando você é o usuário final de uma solução pronta.

---

### Comparação rápida

| | IaaS | PaaS | SaaS |
|---|---|---|---|
| **Sistema operacional** | Você | Nuvem | Nuvem |
| **Runtime / linguagem** | Você | Nuvem | Nuvem |
| **Seu código** | Você | Você | N/A |
| **Dados** | Você | Você | Nuvem |
| **Exemplo AWS** | EC2 | Elastic Beanstalk | — |

---

## 3. O que é AWS

### Amazon Web Services

AWS é a plataforma de computação em nuvem da Amazon. Lançada em 2006, hoje é a maior e mais usada do mundo — responsável por uma fatia enorme da internet que você usa todo dia.

> Sabe quando o Instagram, a Netflix ou o Airbnb saem do ar? Muitas vezes é porque a AWS teve algum problema — isso mostra o quanto o mundo digital depende dela.

A AWS oferece mais de **200 serviços** diferentes: desde servidores simples até inteligência artificial, blockchain, satélites e muito mais.

---

### Por que empresas usam AWS?

- **Custo sob demanda** — paga só pelo que usa, sem investimento inicial em hardware
- **Escala global** — em minutos você coloca sua aplicação disponível no mundo inteiro
- **Confiabilidade** — a AWS tem acordos de 99,99% de disponibilidade (menos de 1h fora por ano)
- **Segurança** — times inteiros dedicados à segurança da infraestrutura
- **Velocidade** — lançar um servidor leva segundos, não semanas
- **Ecossistema** — os 200+ serviços se integram facilmente entre si

---

### Exemplos reais de uso

| Empresa | Como usa AWS |
|---|---|
| **Netflix** | Hospeda todo o streaming de vídeo em EC2 e S3 |
| **Airbnb** | Banco de dados e backend rodando na AWS |
| **NASA** | Processa imagens do telescópio espacial em EC2 |
| **Nubank** | Infraestrutura financeira em cloud |
| **iFood** | Escalabilidade no horário do almoço |

---

## 4. Serviços Principais da AWS para Desenvolvedores

### 🖥️ EC2 — Elastic Compute Cloud

**O que é:** Um servidor virtual na nuvem. Você escolhe o sistema operacional, CPU, memória RAM e disco — e tem uma máquina virtual rodando em minutos.

**Analogia:** Alugar um computador potente que fica ligado 24h por dia em um data center da Amazon.

**Para que serve:**
- Hospedar seu backend Node.js, Python, Java, etc.
- Rodar scripts e processos pesados
- Hospedar qualquer aplicação que precise de um servidor dedicado

**Exemplo prático:**
```
Seu projeto Node.js roda em uma instância EC2 t3.micro
→ 2 vCPUs, 1GB RAM
→ Ubuntu 22.04 instalado
→ Você acessa via SSH e faz o deploy do seu código
→ Qualquer pessoa no mundo acessa via IP público
```

**Tipos de instância (tamanhos):**
- `t3.micro` — pequeno, grátis no primeiro ano (Free Tier)
- `t3.medium` — uso geral, projetos em produção
- `c5.xlarge` — otimizado para processamento
- `r5.large` — otimizado para memória (bancos de dados)

---

### 🗂️ S3 — Simple Storage Service

**O que é:** Armazenamento de arquivos na nuvem. Funciona como um HD virtual infinito — você guarda qualquer tipo de arquivo (imagens, vídeos, PDFs, backups, código) e acessa via URL.

**Analogia:** Um Google Drive para desenvolvedores, com API, permissões granulares e escala industrial.

**Para que serve:**
- Hospedar imagens e assets do seu site
- Armazenar backups do banco de dados
- Hospedar sites estáticos (HTML, CSS, JS)
- Guardar arquivos enviados por usuários (fotos de perfil, documentos)

**Exemplo prático:**
```
Usuário faz upload de foto de perfil no seu app
→ App envia o arquivo para o S3
→ S3 retorna uma URL pública: https://seu-bucket.s3.amazonaws.com/foto.jpg
→ Você salva essa URL no banco de dados
→ Qualquer pessoa acessa a foto por essa URL
```

> ⚠️ **Importante:** Arquivos no S3 não são "executados" — só armazenados e servidos. Para rodar código, você precisa do EC2 ou Lambda.

---

### 🗄️ RDS — Relational Database Service

**O que é:** Banco de dados relacional gerenciado. Em vez de instalar e administrar o MySQL ou PostgreSQL você mesmo, a AWS faz isso por você.

**Analogia:** Contratar um DBA (Administrador de Banco de Dados) que trabalha 24h e nunca tira férias.

**Bancos suportados:**
- MySQL
- PostgreSQL
- MariaDB
- Oracle
- SQL Server
- Amazon Aurora (banco próprio da AWS, compatível com MySQL/PostgreSQL)

**O que a AWS gerencia por você:**
- Backups automáticos diários
- Atualizações de segurança
- Alta disponibilidade (Multi-AZ)
- Monitoramento e alertas

**Exemplo prático:**
```
Seu backend Node.js precisa de um banco de dados
→ Você cria um RDS com MariaDB
→ A AWS fornece um endpoint: meu-banco.xxxxx.us-east-1.rds.amazonaws.com
→ Você coloca esse endpoint no .env do seu projeto
→ Seu código conecta normalmente, igual ao localhost — só o endereço muda
```

---

### ⚡ Lambda

**O que é:** Execução de código sem servidor (Serverless). Você escreve uma função, sobe para o Lambda, e ela só executa quando chamada — você não paga nada quando não está rodando.

**Analogia:** Uma tomada elétrica. Só gasta energia quando você liga algo nela.

**Para que serve:**
- Processar uma imagem quando ela é enviada ao S3
- Responder a uma requisição de API simples
- Executar tarefas agendadas (como um cron job)
- Processar eventos em tempo real

**Diferença do EC2:**

| EC2 | Lambda |
|---|---|
| Servidor ligado 24h | Executa só quando chamado |
| Você gerencia o SO | Sem servidor para gerenciar |
| Paga por hora | Paga por execução |
| Bom para apps contínuos | Bom para tarefas pontuais |

**Exemplo prático:**
```
Usuário faz upload de foto → S3 recebe o arquivo
→ S3 dispara um evento para o Lambda
→ Lambda redimensiona a imagem automaticamente
→ Lambda salva a versão redimensionada de volta no S3
→ Tudo isso sem nenhum servidor ligado permanentemente
```

---

### 🌐 CloudFront

**O que é:** CDN (Content Delivery Network) da AWS. Distribui seu conteúdo em servidores espalhados pelo mundo para que os usuários recebam os arquivos do servidor mais próximo deles.

**Analogia:** Em vez de ter um único restaurante em São Paulo servindo pedidos do Brasil inteiro, você tem filiais em cada cidade. O pedido sempre vem da filial mais próxima.

**Para que serve:**
- Acelerar o carregamento do seu site
- Servir arquivos do S3 com baixa latência globalmente
- Proteger contra ataques DDoS
- Cachear conteúdo estático (imagens, CSS, JS)

**Exemplo prático:**
```
Seu site está no S3 em São Paulo
→ Usuário no Japão acessa seu site
→ Sem CloudFront: arquivo viaja de SP → Japão (lento)
→ Com CloudFront: arquivo está em cache em Tóquio (rápido)
```

---

### 🔐 IAM — Identity and Access Management

**O que é:** Sistema de controle de acesso da AWS. Define **quem** pode fazer **o quê** nos seus recursos da AWS.

**Analogia:** O RH da sua empresa. Define quem tem crachá, quais andares cada pessoa pode acessar e quais salas são restritas.

**Conceitos do IAM:**

- **Usuário (User)** — uma pessoa ou sistema com credenciais próprias
- **Grupo (Group)** — conjunto de usuários com as mesmas permissões
- **Função (Role)** — permissões temporárias que um serviço pode assumir
- **Política (Policy)** — documento JSON que define o que é permitido ou negado

**Exemplo prático:**
```json
{
  "Effect": "Allow",
  "Action": ["s3:GetObject", "s3:PutObject"],
  "Resource": "arn:aws:s3:::meu-bucket/*"
}
```
> Essa política permite apenas ler e escrever no bucket — nada mais.

**Boas práticas:**
- Nunca usar a conta root para o dia a dia
- Aplicar o princípio do menor privilégio (dar só o acesso necessário)
- Usar Roles para serviços, não usuários com senha

---

## 5. Exemplo Prático de Arquitetura

Veja como seria a arquitetura de um projeto completo usando AWS — por exemplo, o sistema de Biblioteca Virtual:

```
┌─────────────────────────────────────────────────────────┐
│                        USUÁRIO                          │
│                   (navegador / celular)                 │
└──────────────────────────┬──────────────────────────────┘
                           │ HTTPS
                           ▼
┌─────────────────────────────────────────────────────────┐
│                      CLOUDFRONT                         │
│              CDN — entrega conteúdo rápido              │
│         Cache de assets estáticos (JS, CSS, img)        │
└──────────┬──────────────────────────┬───────────────────┘
           │                          │
           ▼                          ▼
┌──────────────────┐      ┌───────────────────────────────┐
│       S3         │      │         EC2 (Backend)          │
│  Frontend React  │      │         Node.js + Express      │
│  (build estático)│      │         porta 3001             │
└──────────────────┘      └──────────────┬────────────────┘
                                         │ SQL
                                         ▼
                          ┌───────────────────────────────┐
                          │            RDS                 │
                          │    MariaDB / PostgreSQL        │
                          │    Banco gerenciado pela AWS   │
                          └───────────────────────────────┘
```

### Como cada peça se encaixa

**Frontend (S3 + CloudFront)**
- O `npm run build` gera uma pasta `/build` com arquivos estáticos
- Esses arquivos são enviados para um bucket S3
- O CloudFront distribui esses arquivos globalmente com baixa latência
- Resultado: site rápido, sem servidor para gerenciar, custo baixíssimo

**Backend (EC2)**
- Uma instância EC2 rodando Ubuntu com Node.js instalado
- O código do servidor fica nessa máquina, rodando com PM2
- O EC2 tem um IP público ou domínio configurado
- O frontend faz requisições para esse endereço

**Banco de dados (RDS)**
- O MariaDB roda no RDS, não no mesmo EC2 do backend
- O backend conecta via variável de ambiente: `DB_HOST=meu-banco.rds.amazonaws.com`
- A comunicação entre EC2 e RDS fica dentro da rede privada da AWS (mais seguro)

**Segurança (IAM + Security Groups)**
- IAM controla quem acessa os serviços AWS
- Security Groups funcionam como firewall: definem quais portas e IPs podem se comunicar
- O RDS só aceita conexões vindas do EC2, não da internet pública

---

## 6. Fluxo Real de Deploy

### O que significa "deploy"?

Deploy é o processo de pegar o código que está funcionando no seu computador e colocá-lo em um ambiente acessível para outras pessoas — seja de teste (staging) ou produção.

> **Analogia:** Deploy é como abrir as portas de um restaurante. Antes, a cozinha (desenvolvimento) estava testando os pratos. No deploy, você vira o letreiro para "ABERTO" e os clientes começam a entrar.

---

### Ambientes comuns

```
Seu computador → Staging (homologação) → Produção
    (dev)              (teste final)       (usuários reais)
```

---

### Passo a passo: do computador à nuvem

#### Etapa 1 — Preparar o código

```bash
# Garantir que tudo está funcionando localmente
npm run dev

# Rodar testes (se houver)
npm test

# Fazer commit das alterações
git add .
git commit -m "feat: nova funcionalidade"
git push origin main
```

#### Etapa 2 — Acessar o servidor EC2

```bash
# Conectar via SSH ao servidor EC2
ssh -i "minha-chave.pem" ubuntu@IP_DO_SERVIDOR

# Exemplo real:
ssh -i "biblioteca.pem" ubuntu@54.123.45.67
```

#### Etapa 3 — Atualizar o código no servidor

```bash
# Dentro do EC2, puxar as últimas alterações do GitHub
cd /home/ubuntu/meu-projeto
git pull origin main

# Instalar novas dependências (se houver)
npm install --production
```

#### Etapa 4 — Reiniciar o servidor

```bash
# PM2 é um gerenciador de processos para Node.js
# Mantém o servidor rodando mesmo após fechar o terminal

pm2 restart minha-api
pm2 status  # verifica se está rodando
```

#### Etapa 5 — Verificar

```bash
# Testar se a API está respondendo
curl http://IP_DO_SERVIDOR:3001/health

# Resposta esperada:
# { "status": "OK", "timestamp": "2026-03-05T..." }
```

---

### Fluxo visual completo

```
Desenvolvedor
     │
     │  git push
     ▼
  GitHub
     │
     │  git pull (manual ou automático)
     ▼
  EC2 (servidor)
     │
     │  npm install + pm2 restart
     ▼
  Aplicação rodando
     │
     │  usuários acessam via navegador/app
     ▼
  Usuários finais
```

> 💡 **Próximo nível:** Esse processo manual pode ser automatizado com **CI/CD** (GitHub Actions, por exemplo). Cada `git push` dispara automaticamente o deploy no servidor.

---

## 7. Glossário de Termos Importantes

### Deploy
Processo de disponibilizar uma aplicação em um ambiente acessível. Pode ser deploy em staging (teste) ou produção (usuários reais). Envolve copiar o código para o servidor, instalar dependências e reiniciar o processo.

---

### Instância
Uma máquina virtual rodando na nuvem. No EC2, cada "servidor" que você cria é chamado de instância. Você pode ter várias instâncias rodando ao mesmo tempo, cada uma com configurações diferentes.

---

### Escalabilidade
Capacidade de um sistema de crescer (ou diminuir) conforme a demanda.

- **Escala vertical (Scale Up):** aumentar o tamanho da instância (mais CPU, mais RAM). Tem limite.
- **Escala horizontal (Scale Out):** adicionar mais instâncias em paralelo. Praticamente sem limite.

```
Scale Up:    [servidor pequeno] → [servidor grande]

Scale Out:   [servidor] → [servidor] + [servidor] + [servidor]
```

> O Netflix escala horizontalmente durante picos (fim de semana à noite) e reduz nas madrugadas — pagando só pelo que precisa.

---

### Região (Region)
Localização geográfica onde a AWS tem data centers. Cada região é independente das outras.

Exemplos:
- `us-east-1` — Norte da Virgínia (EUA)
- `sa-east-1` — São Paulo (Brasil)
- `eu-west-1` — Irlanda
- `ap-southeast-1` — Singapura

**Por que importa:** Quanto mais próxima a região do seu usuário, menor a latência (atraso). Um usuário brasileiro acessa mais rápido um servidor em `sa-east-1` do que em `us-east-1`.

---

### Zona de Disponibilidade (Availability Zone — AZ)
Dentro de cada região, existem múltiplos data centers físicos separados chamados de Zonas de Disponibilidade. Se um pegar fogo ou ter queda de energia, os outros continuam funcionando.

```
Região: sa-east-1 (São Paulo)
├── AZ: sa-east-1a  (data center A)
├── AZ: sa-east-1b  (data center B)
└── AZ: sa-east-1c  (data center C)
```

> Distribuir sua aplicação em múltiplas AZs é o que garante alta disponibilidade. Se uma cair, as outras absorvem o tráfego.

---

### Load Balancer (Balanceador de Carga)
Componente que distribui o tráfego entre múltiplas instâncias para evitar sobrecarga em uma só.

```
Usuários → Load Balancer → Instância 1 (33% do tráfego)
                        → Instância 2 (33% do tráfego)
                        → Instância 3 (33% do tráfego)
```

Se a Instância 2 cair, o Load Balancer automaticamente para de mandar tráfego para ela e divide entre as outras duas.

---

### Bucket
Nome dado aos "contêineres" de armazenamento no S3. Cada bucket tem um nome único global e pode guardar praticamente qualquer arquivo. É como uma pasta raiz no S3.

---

### VPC (Virtual Private Cloud)
Rede privada virtual dentro da AWS. Permite isolar seus recursos da internet pública. O EC2 e o RDS, por exemplo, podem se comunicar dentro da VPC sem expor nada para fora.

---

### Security Group
Funciona como um firewall virtual. Define quais conexões de entrada (inbound) e saída (outbound) são permitidas para uma instância.

```
Security Group do RDS:
- Permite conexão na porta 3306 SOMENTE do EC2
- Bloqueia qualquer outra origem
```

---

### Free Tier
Camada gratuita da AWS. Ao criar uma conta, você tem 12 meses de acesso gratuito a certos serviços dentro de limites:
- EC2 t3.micro: 750h/mês grátis
- S3: 5GB grátis
- RDS: 750h/mês de db.t3.micro grátis
- Lambda: 1 milhão de execuções/mês grátis

---

### Latência
Tempo que um dado leva para ir do servidor até o usuário (e voltar). Medida em milissegundos. Quanto menor, melhor. Por isso escolher a região correta importa.

---

### CI/CD
Continuous Integration / Continuous Delivery. Prática de automatizar testes e deploy a cada alteração no código. Com CI/CD, um `git push` pode automaticamente testar, buildar e fazer deploy da aplicação sem intervenção manual.

---

## 8. Perguntas Comuns de Entrevista

### ❓ O que é computação em nuvem?

> É o uso de recursos computacionais (servidores, armazenamento, banco de dados) pela internet, sob demanda, pagando pelo que usar. Em vez de ter hardware próprio, você aluga a infraestrutura de provedores como AWS, Google Cloud ou Azure.

---

### ❓ Qual a diferença entre IaaS, PaaS e SaaS?

> **IaaS** fornece infraestrutura (servidor virtual, rede) — você gerencia tudo por cima. **PaaS** entrega uma plataforma pronta para desenvolver — sem se preocupar com SO ou servidor. **SaaS** é o software pronto para usar, sem nenhuma gestão técnica. Exemplo: EC2 é IaaS, Heroku é PaaS, Gmail é SaaS.

---

### ❓ O que é EC2?

> EC2 (Elastic Compute Cloud) é o serviço de servidores virtuais da AWS. Você cria uma instância (máquina virtual), escolhe o sistema operacional e a capacidade, e tem um servidor disponível em minutos. É usado para hospedar backends, APIs e qualquer aplicação que precise de um servidor dedicado.

---

### ❓ Qual a diferença entre EC2 e Lambda?

> EC2 é um servidor que fica ligado continuamente — você paga por hora, independente de haver tráfego. Lambda é serverless — executa código apenas quando chamado e você paga por execução. Lambda é ideal para tarefas pontuais e eventos; EC2 é melhor para aplicações que precisam rodar constantemente.

---

### ❓ Para que serve o S3?

> S3 (Simple Storage Service) é o serviço de armazenamento de objetos da AWS. Serve para guardar qualquer tipo de arquivo: imagens, vídeos, backups, arquivos de usuários. Também é muito usado para hospedar sites estáticos (HTML, CSS, JS). Os arquivos ficam acessíveis via URL pública ou privada.

---

### ❓ O que é RDS e por que usar em vez de instalar o banco no EC2?

> RDS é o banco de dados gerenciado da AWS. A diferença de instalar no EC2 é que com RDS a AWS cuida de backups automáticos, atualizações de segurança, alta disponibilidade e failover automático. No EC2 você teria que fazer tudo isso manualmente. Para projetos em produção, RDS é mais seguro e confiável.

---

### ❓ O que é IAM?

> IAM (Identity and Access Management) é o sistema de controle de acesso da AWS. Define quem (usuário, grupo ou serviço) pode fazer o quê (ações) em quais recursos. É fundamental para segurança — sem IAM configurado corretamente, qualquer pessoa com as credenciais poderia acessar tudo.

---

### ❓ O que é escalabilidade horizontal vs. vertical?

> Escalabilidade vertical é aumentar o tamanho de uma instância (mais CPU e RAM). Tem um limite físico. Escalabilidade horizontal é adicionar mais instâncias em paralelo para dividir a carga. É a abordagem preferida na nuvem porque praticamente não tem limite e é mais resiliente a falhas.

---

### ❓ O que é uma região e uma zona de disponibilidade?

> Região é uma localização geográfica onde a AWS tem data centers (ex: São Paulo, Virgínia, Irlanda). Zona de disponibilidade (AZ) são data centers físicos separados dentro de uma região. Distribuir recursos em múltiplas AZs garante que, se um data center falhar, os outros continuam atendendo.

---

### ❓ O que é deploy?

> Deploy é o processo de disponibilizar uma aplicação para os usuários finais. Envolve pegar o código do ambiente de desenvolvimento, transferir para o servidor de produção, instalar dependências e iniciar o processo. Pode ser feito manualmente (SSH + git pull) ou automaticamente via CI/CD.

---

### ❓ O que é CloudFront?

> CloudFront é a CDN (Content Delivery Network) da AWS. Distribui conteúdo em servidores espalhados pelo mundo, fazendo com que os usuários recebam os arquivos do ponto mais próximo deles geograficamente. Reduz latência, acelera o carregamento e pode proteger contra ataques DDoS.

---

## 9. Resumo para Revisão Rápida

### Cloud Computing em 3 linhas
Usar servidores e recursos pela internet, pagando pelo uso, sem comprar hardware. Mais barato para começar, escala sob demanda e você não precisa se preocupar com manutenção física.

---

### Os 3 modelos de serviço

| Modelo | Você gerencia | Exemplo |
|---|---|---|
| IaaS | Tudo exceto hardware | EC2 |
| PaaS | Só o código | Heroku, Elastic Beanstalk |
| SaaS | Nada | Gmail, Notion |

---

### Os 6 serviços AWS mais importantes para devs

| Serviço | Para que serve | Analogia |
|---|---|---|
| **EC2** | Servidor virtual | Computador alugado 24h |
| **S3** | Armazenamento de arquivos | HD infinito na nuvem |
| **RDS** | Banco de dados gerenciado | DBA que nunca dorme |
| **Lambda** | Código serverless | Tomada elétrica (só gasta quando usa) |
| **CloudFront** | CDN global | Filiais em todo o mundo |
| **IAM** | Controle de acesso | RH + segurança da empresa |

---

### Arquitetura típica de projeto Full Stack na AWS

```
Usuário → CloudFront → S3 (frontend)
                    → EC2 (backend Node.js)
                           → RDS (banco de dados)
```

---

### Termos-chave para entrevista

- **Deploy** — colocar o código em produção
- **Instância** — servidor virtual no EC2
- **Região** — localização geográfica dos data centers
- **AZ** — data centers separados dentro de uma região
- **Escalabilidade horizontal** — mais instâncias em paralelo
- **Load Balancer** — distribui tráfego entre instâncias
- **Serverless** — código que roda sem servidor fixo (Lambda)
- **CDN** — rede que entrega conteúdo pelo ponto mais próximo
- **IAM** — controle de quem acessa o quê na AWS
- **VPC** — rede privada isolada dentro da AWS
- **Free Tier** — camada gratuita da AWS por 12 meses

---

### Checklist de conceitos dominados

- [ ] Sei explicar o que é cloud computing com uma analogia
- [ ] Sei diferenciar IaaS, PaaS e SaaS com exemplos
- [ ] Sei para que serve EC2, S3, RDS, Lambda, CloudFront e IAM
- [ ] Consigo desenhar uma arquitetura básica de projeto na AWS
- [ ] Sei explicar o fluxo de deploy do computador até a nuvem
- [ ] Entendo o que é escala horizontal vs. vertical
- [ ] Sei o que é região, AZ e por que isso importa para disponibilidade

---

<div align="center">

**☁️ "A nuvem não é um lugar mágico — é o computador de outra pessoa, muito bem gerenciado."**

*Guia criado para estudo e portfólio técnico*

</div>
