## Sobre o repositório

Esse repositório contém o código-fonte de um projeto explorando Nest.js e Kafka. O projeto consiste em um sistema de criação de ordem de compras e processamente de pagamentos a partir de um microserviço.

## Rodar a aplicação

---

### Rodando através do docker compose up:

Acesse a pasta `nestjs-kafka-orders-payments-api` e abra o `VSCode`:

```bash
cd nestjs-kafka-orders-payments-api && code .
```

Rode os containers com o comando:

```bash
docker compose up
```

Entre no container do `next`:

```bash
docker compose exec app bash
```

Instale as dependências:

```bash
npm install
```

#### Orders

Rode o comando para o `prisma` realizar a `migrate`:

```bash
cd apps/orders && npx prisma migrate dev
```

Para rodar a aplicação rode o comando:

```bash
npm run start:dev
```

#### Payments

Rode o comando para o `prisma` realizar a `migrate`:

```bash
cd apps/payments && npx prisma migrate dev
```

Para rodar a aplicação rode o comando:

```bash
npm run start:dev payments
```

OBSERVAÇÃO: Caso precise parar os containers por algum motivo rode o comando: `docker compose down`, pois o container do `Kafka` precisa ser parado e restartado.

---

### Dev Container:

Instale as dependências:

```bash
npm install
```

#### Orders

Rode o comando para o `prisma` realizar a `migrate`:

```bash
cd apps/orders && npx prisma migrate dev
```

Para rodar a aplicação rode o comando:

```bash
npm run start:dev
```

Para abrir a documentação da API

```bash
https:localhost:3000/api
```

#### Payments

Rode o comando para o `prisma` realizar a `migrate`:

```bash
cd apps/payments && npx prisma migrate dev
```

Para rodar a aplicação rode o comando:

```bash
npm run start:dev payments
```

Para abrir a documentação da API

```bash
https:localhost:3001/api
```

OBSERVAÇÃO: Caso precise parar os containers por algum motivo faça como abaixo:

Digite `ctrl + shift + p` e selecione `Dev Containers: Rebuild Containers`, pois o container do `Kafka` precisa ser parado e restartado.

---

Existe um arquivo na raiz do projeto Nest.js, o `api.http` que você pode usar para testar a aplicação com o plugin do VSCode [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client). Quando enviar dados na requisição, o Nest.js consumirá a mensagem e mostrará no console.
