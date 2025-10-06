# Larify API

Este repositório contém a API backend para a plataforma **Larify**, uma aplicação web pública projetada para conectar proprietários de imóveis a potenciais compradores e inquilinos.

A API é construída com [Bun](https://bun.sh/), [Prisma](https://www.prisma.io/), [Express](https://expressjs.com/) e [Tsoa](https://tsoa-community.github.io/docs/home/), utilizando uma arquitetura limpa e escalável para dar suporte às necessidades do negócio.

---

## ✨ Funcionalidades Principais da API

- **Gestão de Usuários:** Cadastro e autenticação (integrado com Firebase).
- **CRUD de Imóveis:** Gerenciamento completo (criação, leitura, atualização e deleção) de anúncios de imóveis para venda ou aluguel.
- **Upload de Imagens:** Suporte para múltiplas imagens por anúncio.
- **Busca e Filtragem:** Endpoints preparados para filtros por localização (cidade), tipo (venda/aluguel), preço, etc.
- **Painel do Usuário:** Lógica para carregar e gerenciar os próprios anúncios em uma área privada.
- **Contato Direto:** Armazenamento de telefone do usuário para facilitar o contato via WhatsApp a partir do front-end.

---

## 📁 Estrutura do Projeto

```
.
├── src
│   ├── core/               # Funcionalidades centrais (logger, env, erros, etc.)
│   ├── domains/            # Lógica de domínio, dividida por módulos de negócio
│   │   └── properties/     # Exemplo de domínio: imóveis
│   ├── server/             # Rotas geradas pelo TSOA e inicialização do servidor
│   └── index.ts            # Ponto de entrada da aplicação
├── prisma/                 # Schema e migrações do Prisma
├── tests/                  # Testes E2E e de integração
├── docker/                 # Arquivos de configuração do Docker
├── tsconfig.json
├── bun.lockb
├── .env.example            # Exemplo de variáveis de ambiente
├── .env                    # Variáveis de ambiente (ignoradas pelo Git)
├── .env.test               # Usado apenas para testes (ignorado pelo Git)
```

---

## 🚀 Começando

### Requisitos

- [Bun](https://bun.sh/docs/installation)
- [PostgreSQL](https://www.postgresql.org/) com duas bases de dados:
  - `larify_development` para desenvolvimento
  - `larify_test` para testes

### Instalação

```bash
bun install
```

---

## 🧪 Scripts

| Script             | Descrição                                  |
| ------------------ | ------------------------------------------ |
| `bun dev`          | Inicia o servidor em modo de desenvolvimento |
| `bun run test`     | Reseta o banco de testes e executa os testes |
| `bun test:prepare` | Prepara o banco de dados para os testes      |
| `bun lint`         | Executa o ESLint para análise de código      |
| `bun lint:fix`     | Corrige problemas de lint automaticamente    |
| `bun format`       | Formata o código com o Prettier              |
| `bun routes:gen`   | Gera novamente as rotas do TSOA              |

> ℹ️ O Bun carrega automaticamente o arquivo `.env`. Para testes, ele utiliza o arquivo especificado na flag `--env-file`.

---

## 📚 Estrutura de Domínio

Cada domínio fica em `src/domains/{module}` e pode incluir:

- `*.controller.ts` — Define as rotas usando os decoradores do TSOA.
- `*.service.ts` — Contém a lógica de negócio.
- `*.repository.ts` — (Opcional) Camada de acesso ao banco de dados.
- `dto/` — _Data Transfer Objects_ para validação de entrada e saída.
- `interfaces/` — Contratos e interfaces do domínio.

Exemplo: `src/domains/properties/`

---

## ✨ Integração com TSOA

- As rotas e a especificação OpenAPI (Swagger) são geradas automaticamente com o comando:

```bash
bun routes:gen
```

- Decoradores como `@Route`, `@Get`, `@Post`, e `@Response` permitem a documentação automática e a validação das rotas.

---

## ⚠️ Tratamento de Erros

- Todos os erros personalizados herdam da classe `ServerError`.
- A resposta de erro é padronizada no seguinte formato:

```json
{
  "error": "NomeDoErro",
  "message": "Explicação opcional do erro"
}
```

---

## 🐘 Configuração do PostgreSQL

Crie duas bases de dados locais:

```bash
# Desenvolvimento
createdb larify_development

# Testes
createdb larify_test
```

E configure seus arquivos `.env` e `.env.test` com a variável `LARIFY_DATABASE_URL` apropriada.

---

## 🐳 Docker (Apenas Produção)

Para construir e executar a imagem Docker para produção:

```bash
docker build -f ./docker/Dockerfile -t larify-api .
docker run -p 3000:3000 --env-file .env larify-api
```