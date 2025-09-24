# Guia de Explicação do Dockerfile

Este documento explica a estrutura e o propósito do `Dockerfile` utilizado neste projeto. O arquivo utiliza uma abordagem de *multi-stage builds* (construção em múltiplos estágios) para criar ambientes otimizados tanto para desenvolvimento quanto para produção.

## O que é um Multi-Stage Build?

Um multi-stage build é uma técnica do Docker que permite usar múltiplos estágios `FROM` em um único `Dockerfile`. A principal vantagem é a capacidade de criar uma imagem de produção final que seja significativamente menor e mais segura, contendo apenas o necessário para executar a aplicação, sem incluir dependências e arquivos de desenvolvimento.

---

## Análise dos Estágios

Nosso `Dockerfile` é dividido em três estágios principais: `base`, `development`, e `production`.

### Estágio 1: `base`

```dockerfile
# Estágio 1: Base
FROM oven/bun:1.2.22 as base
WORKDIR /app
COPY bun.lock package.json tsconfig.json ./
```

- **`FROM oven/bun:1.2.22 as base`**: Define a imagem inicial. Usamos uma imagem oficial que já vem com o `bun` (um runtime e toolkit de JavaScript). O `as base` é um rótulo que nos permite referenciar este estágio posteriormente.
- **`WORKDIR /app`**: Cria e define o diretório `/app` como o diretório de trabalho padrão dentro do contêiner.
- **`COPY bun.lock ...`**: Copia os arquivos essenciais para a instalação de dependências. Fazemos isso em uma camada separada para aproveitar o sistema de cache do Docker. Se esses arquivos não mudarem entre os builds, o Docker reutiliza a camada em cache em vez de reinstalar tudo, acelerando o processo.

### Estágio 2: `development`

```dockerfile
# Estágio 2: Desenvolvimento
FROM base as development
RUN bun install
COPY . .
CMD ["bun", "dev"]
```

- **`FROM base as development`**: Inicia um novo estágio a partir do estágio `base`. Este será nosso ambiente de desenvolvimento.
- **`RUN bun install`**: Executa o comando para instalar **todas** as dependências do projeto, incluindo as de desenvolvimento (`devDependencies`).
- **`COPY . .`**: Copia todo o restante do código-fonte do seu projeto para o contêiner.
- **`CMD ["bun", "dev"]`**: Define o comando padrão que será executado quando o contêiner iniciar. `bun dev` geralmente inicia o servidor em modo de desenvolvimento com hot-reload.

### Estágio 3: `production`

```dockerfile
# Estágio 3: Produção
FROM base as production
RUN bun install --production
COPY . .
CMD ["bun", "run", "src/index.ts"]
```

- **`FROM base as production`**: Inicia o estágio final a partir do `base`, e não do `development`. Isso é crucial. Ao fazer isso, descartamos todas as dependências de desenvolvimento que foram instaladas no estágio anterior, começando com um ambiente limpo que contém apenas os arquivos de configuração.
- **`RUN bun install --production`**: Instala **apenas** as dependências necessárias para produção. Isso cria uma pasta `node_modules` muito menor.
- **`COPY . .`**: Copia o código-fonte para o contêiner.
- **`CMD ["bun", "run", "src/index.ts"]`**: Define o comando para iniciar a aplicação em modo de produção.

## Como Usar

No arquivo `docker-compose.yml`, você pode escolher qual estágio (`target`) usar ao construir a imagem:

```yaml
services:
  bun:
    build:
      context: .
      dockerfile: docker/Dockerfile
      target: development # ou 'production'
```

Isso lhe dá a flexibilidade de rodar um ambiente completo para desenvolver e um ambiente enxuto e otimizado para produção.
