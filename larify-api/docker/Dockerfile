# Estágio 1: Base
# Define a imagem base que já vem com o Bun instalado.
# 'as base' nomeia este estágio para que possamos nos referir a ele mais tarde.
FROM oven/bun:1.2.22 as base

# Define o diretório de trabalho dentro do contêiner como /app.
# Todos os comandos subsequentes serão executados a partir deste diretório.
WORKDIR /app

# Copia os arquivos de configuração e dependências para o contêiner.
# Isso é feito antes de copiar o resto do código para aproveitar o cache do Docker.
# Se esses arquivos não mudarem, o Docker não precisará reinstalar as dependências.
COPY bun.lock package.json tsconfig.json ./

# Estágio 2: Desenvolvimento
# Este estágio é usado para o ambiente de desenvolvimento.
# Ele começa a partir do estágio 'base'.
FROM base as development

# Instala TODAS as dependências, incluindo as de desenvolvimento.
RUN bun install

# Copia todo o resto do código do projeto para o diretório de trabalho /app.
COPY . .

# Define o comando padrão para iniciar o contêiner em modo de desenvolvimento.
# Este comando pode ser sobrescrito no docker-compose.yml.
CMD ["bun", "dev"]

# Estágio 3: Produção
# Este estágio é otimizado para o ambiente de produção.
# Ele também começa a partir do estágio 'base', garantindo um ambiente limpo.
FROM base as production

# Instala apenas as dependências de produção, ignorando as de desenvolvimento.
# Isso resulta em uma imagem final menor e mais segura.
RUN bun install --production

# Copia todo o resto do código do projeto para o diretório de trabalho /app.
COPY . .

# Define o comando padrão para iniciar a aplicação em produção.
CMD ["bun", "run", "src/index.ts"]