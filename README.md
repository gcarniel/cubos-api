# 🎬 Cubos Movies API

API RESTful para gerenciamento de filmes desenvolvida como desafio técnico para a Cubos Tecnologia. Sistema completo com autenticação JWT, upload de arquivos para AWS S3, notificações por e-mail e documentação interativa via Swagger.

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Funcionalidades](#funcionalidades)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Como Executar](#como-executar)
- [Seed do Banco de Dados](#seed-do-banco-de-dados)
- [Documentação da API](#documentação-da-api)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Funcionalidades Avançadas](#funcionalidades-avançadas)

## 🎯 Sobre o Projeto

A **Cubos Movies API** é uma aplicação backend robusta para gerenciamento de catálogo de filmes. Permite que usuários cadastrem, editem, listem e excluam filmes, com suporte a upload de imagens (posters e covers), filtros avançados de busca e notificações automáticas por e-mail sobre lançamentos.

### Principais Características:

- ✅ Autenticação e autorização com JWT
- ✅ CRUD completo de filmes
- ✅ Upload de imagens para AWS S3
- ✅ Sistema de gêneros cinematográficos
- ✅ Filtros avançados (rating, duração, data de lançamento)
- ✅ Paginação de resultados
- ✅ Notificações automáticas por e-mail (cron job diário)
- ✅ Documentação interativa com Swagger UI
- ✅ Validação de dados com Zod
- ✅ Banco de dados PostgreSQL com Prisma ORM

## 🚀 Tecnologias Utilizadas

### Backend

- **Node.js** - Runtime JavaScript
- **TypeScript** - Superset tipado do JavaScript
- **Fastify** - Framework web de alta performance
- **Prisma** - ORM moderno para Node.js e TypeScript
- **PostgreSQL** - Banco de dados relacional

### Autenticação e Segurança

- **@fastify/jwt** - Autenticação JWT
- **bcryptjs** - Hash de senhas
- **@fastify/cors** - Configuração de CORS

### Upload e Armazenamento

- **@aws-sdk/client-s3** - Upload de arquivos para AWS S3
- **@fastify/multipart** - Processamento de uploads multipart

### Validação e Documentação

- **Zod** - Validação de schemas
- **@fastify/swagger** - Geração de documentação OpenAPI
- **@fastify/swagger-ui** - Interface visual da documentação

### Notificações

- **Resend** - Serviço de envio de e-mails
- **node-cron** - Agendamento de tarefas

### Desenvolvimento

- **tsx** - Execução de TypeScript
- **tsup** - Bundler para TypeScript
- **ESLint** - Linter de código

## ✨ Funcionalidades

### Autenticação

- **POST** `/auth/register` - Criar nova conta de usuário
- **POST** `/auth/login` - Fazer login e receber token JWT
- **POST** `/auth/forgot-password` - Enviar e-mail de recuperação de senha
- **POST** `/auth/reset-password` - Resetar senha

### Filmes (Requer Autenticação)

- **POST** `/movies` - Criar novo filme
- **GET** `/movies` - Listar filmes com filtros e paginação
- **GET** `/movies/:id` - Buscar filme por ID
- **PUT** `/movies/:id` - Atualizar filme
- **DELETE** `/movies/:id` - Deletar filme
- **GET** `/movies/genres` - Listar todos os gêneros disponíveis

### Upload de Arquivos (Requer Autenticação)

- **POST** `/files/upload` - Upload de imagens (JPEG, PNG, WebP, GIF) até 5MB

### Saúde da API

- **GET** `/health` - Verificar status da API

## 📦 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 22 ou superior)
- **npm** ou **yarn**
- **Docker** e **Docker Compose** (para o banco de dados)
- **Conta AWS** com bucket S3 configurado
- **Conta Resend** para envio de e-mails

## 🔧 Instalação

1. **Clone o repositório:**

```bash
git clone <https://github.com/gcarniel/cubos-api>
cd cubos-api
```

2. **Instale as dependências:**

```bash
npm install
```

3. **Inicie o banco de dados PostgreSQL com Docker:**

```bash
docker-compose up -d
```

Isso irá criar um container PostgreSQL com as seguintes configurações:

- **Host:** localhost
- **Porta:** 5432
- **Usuário:** docker
- **Senha:** docker
- **Database:** cubos

## ⚙️ Configuração

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
# Ambiente
NODE_ENV=development

# Servidor
PORT=3333
HOST=0.0.0.0

# Banco de Dados
DATABASE_URL="postgresql://docker:docker@localhost:5432/cubos?schema=public"

# JWT
JWT_SECRET=sua_chave_secreta_super_segura_aqui

# AWS S3
AWS_S3_BUCKET_NAME=seu-bucket-name
AWS_ACCESS_KEY_ID=sua-access-key-id
AWS_SECRET_ACCESS_KEY=sua-secret-access-key
AWS_REGION=us-east-1

# Resend (E-mail)
RESEND_API_KEY=sua-api-key-do-resend
MAIL_FROM=noreply@seudominio.com
```

`env.example` contém um exemplo de configuração.

### 📝 Notas sobre as Variáveis de Ambiente:

- **JWT_SECRET**: Gere uma string aleatória segura (ex: usando `openssl rand -base64 32`)
- **AWS S3**: Configure um bucket S3 e crie credenciais IAM com permissões de upload
- **Resend**: Crie uma conta em [resend.com](https://resend.com) e obtenha sua API key

## 🏃 Como Executar

### 1. Executar o container do banco:

```bash
docker-compose up -d
```

### 2. Execute as migrações do banco de dados:

```bash
npx prisma migrate dev
```

### 3. (Opcional) Execute o seed para popular o banco com dados de exemplo:

```bash
npx prisma db seed
```

### 4. Inicie o servidor em modo de desenvolvimento:

```bash
npm run dev
```

O servidor estará rodando em `http://localhost:3333`

### 4. Acesse a documentação interativa:

Abra seu navegador em `http://localhost:3333/docs`

## 🌱 Seed do Banco de Dados

O seed popula o banco de dados com:

### Usuários de Teste:

- **Email:** `sample@sample.com` | **Senha:** `123456`
- **Email:** `another@sample.com` | **Senha:** `123456`

### Gêneros:

28 gêneros cinematográficos incluindo: Ação, Aventura, Animação, Biografia, Comédia, Crime, Drama, Fantasia, Ficção Científica, Terror, Thriller, entre outros.

### Filmes:

0 filmes de exemplo com informações completas (título, sinopse, duração, orçamento, receita, popularidade, avaliações, etc.)

Para executar o seed:

```bash
npx prisma db seed
```

Para resetar o banco e executar o seed novamente:

```bash
npx prisma migrate reset
```

⚠️ **Atenção:** O comando `migrate reset` irá **apagar todos os dados** do banco!

## 📚 Documentação da API

### Swagger UI

Acesse a documentação interativa completa em: `http://localhost:3333/docs`

A documentação inclui:

- Todos os endpoints disponíveis
- Schemas de requisição e resposta
- Exemplos de uso
- Possibilidade de testar os endpoints diretamente

### Autenticação

Para endpoints protegidos, você precisa:

1. Fazer login em `/auth/login`
2. Copiar o token JWT retornado
3. No Swagger UI, clicar em "Authorize" e inserir: `Bearer {seu-token}`

### Exemplos de Requisições

#### Registro de Usuário

```bash
curl -X POST http://localhost:3333/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao@example.com",
    "password": "senha123"
  }'
```

#### Login

```bash
curl -X POST http://localhost:3333/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "joao@example.com",
    "password": "senha123"
  }'
```

#### Listar Filmes (com filtros)

```bash
curl -X GET "http://localhost:3333/movies?page=1&take=10&minRating=70&sort=popularity" \
  -H "Authorization: Bearer {seu-token}"
```

#### Criar Filme

```bash
curl -X POST http://localhost:3333/movies \
  -H "Authorization: Bearer {seu-token}" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Inception",
    "originalTitle": "Inception",
    "duration": 148,
    "budget": 160000000,
    "revenue": 829895144,
    "sinopsis": "A thief who steals corporate secrets...",
    "genreIds": ["genre-id-1", "genre-id-2"],
    "language": "en",
    "releaseDate": "2010-07-16T00:00:00.000Z",
    "popularity": 95,
    "voteAverage": 87,
    "voteCount": 35000,
    "posterUrl": "https://example.com/poster.jpg",
    "trailerUrl": "https://youtube.com/watch?v=..."
  }'
```

#### Upload de Imagem

```bash
curl -X POST http://localhost:3333/files/upload \
  -H "Authorization: Bearer {seu-token}" \
  -F "file=@/caminho/para/imagem.jpg"
```

## 📁 Estrutura do Projeto

```
cubos-api/
├── prisma/
│   ├── migrations/          # Migrações do banco de dados
│   ├── schema.prisma        # Schema do Prisma (modelos de dados)
│   └── seed.ts              # Script de seed
├── src/
│   ├── errors/              # Tratamento de erros customizados
│   ├── lib/                 # Utilitários e configurações
│   ├── middlewares/         # Middlewares (autenticação, etc)
│   ├── routes/              # Definição de rotas
│   │   ├── auth-route.ts    # Rotas de autenticação
│   │   ├── files-route.ts   # Rotas de upload
│   │   └── movie-route.ts   # Rotas de filmes
│   ├── schemas/             # Schemas de validação (Zod)
│   ├── services/            # Lógica de negócio
│   │   ├── auth-service.ts
│   │   ├── files-service.ts
│   │   ├── mail-service.ts
│   │   ├── movies-chron-service.ts
│   │   └── movies-service.ts
│   ├── env.ts               # Validação de variáveis de ambiente
│   └── server.ts            # Configuração do servidor Fastify
├── docker-compose.yml       # Configuração do PostgreSQL
├── package.json
├── tsconfig.json
└── tsup.config.ts
```

## 📜 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev              # Inicia o servidor em modo watch

# Banco de Dados
npm run db:migrate       # Executa migrações do Prisma
npm run db:studio        # Abre o Prisma Studio (interface visual do BD)
npx prisma db seed       # Executa o seed do banco
npx prisma migrate reset # Reseta o banco e executa migrações + seed

# Build e Produção
npm run build            # Compila o projeto para JavaScript
npm start                # Inicia o servidor em produção
```

## 🎯 Funcionalidades Avançadas

### 1. Sistema de Notificações por E-mail

A API possui um **cron job** que executa diariamente às **5h da manhã** e:

- Verifica filmes com data de lançamento no dia atual
- Agrupa filmes por usuário criador
- Envia e-mail personalizado para cada usuário com seus lançamentos
- Processa envios em lotes para evitar sobrecarga

### 2. Filtros Avançados de Busca

A listagem de filmes suporta múltiplos filtros:

- **search**: Busca por título
- **minRating / maxRating**: Filtro por avaliação
- **minDuration / maxDuration**: Filtro por duração
- **minReleaseDate / maxReleaseDate**: Filtro por data de lançamento
- **sort**: Ordenação (popularity, voteAverage, releaseDate, title)
- **page / take**: Paginação

### 3. Upload de Arquivos

Sistema robusto de upload com:

- Validação de tipo de arquivo (apenas imagens)
- Limite de tamanho (5MB)
- Upload direto para AWS S3
- Retorno de URL pública do arquivo

### 4. Relacionamentos de Dados

O banco de dados possui relacionamentos bem definidos:

- **User** → **Movies** (1:N)
- **Movie** → **MovieGenre** → **Genre** (N:N)
- Cascade delete configurado para manter integridade

### 5. Validação de Dados

Todas as requisições são validadas usando **Zod**, garantindo:

- Tipos corretos
- Campos obrigatórios
- Formatos válidos (e-mail, URL, datas)
- Mensagens de erro claras

## 🔒 Segurança

- Senhas hasheadas com **bcryptjs**
- Autenticação via **JWT** com expiração de 7 dias
- CORS configurado
- Validação de entrada em todas as rotas
- Autorização por usuário (usuários só podem editar/deletar seus próprios filmes)

## 🐳 Docker

O projeto inclui `docker-compose.yml` para facilitar o setup do PostgreSQL:

```bash
# Iniciar o banco
docker-compose up -d

# Parar o banco
docker-compose down

# Ver logs
docker-compose logs -f
```

## 🛠️ Ferramentas de Desenvolvimento

### Prisma Studio

Interface visual para visualizar e editar dados do banco:

```bash
npm run db:studio
```

Acesse em: `http://localhost:5555`

### ESLint

O projeto usa a configuração da Rocketseat para manter código consistente.

## 📝 Licença

ISC

---

Desenvolvido com ❤️ para o desafio técnico da Cubos Tecnologia
