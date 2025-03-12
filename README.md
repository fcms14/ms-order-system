
# 🏗️ Monorepositório NestJS com Microservices, RabbitMQ, TimescaleDB, Event-Driven, GraphQL Apollo Federation

Este projeto segue uma **arquitetura de microsserviços**, utilizando:

- 🛠️ **NestJS** como framework principal
- 🔌 **RabbitMQ** para comunicação assíncrona entre microsserviços.
- 🗄️ **PostgreSQL** com TimescaleDB para persistência escalável.
- 🚀 **GraphQL Apollo Federation** para unificação das APIs de múltiplos serviços.
- 🔗 **Comunicação interna via TCP** entre microsserviços 
- ⚡ **Docker** para facilitar a execução local e a infraestrutura. 
- 🛠️ **Zod** para validação de variáveis de ambiente

### 📖 Referências:

- [Documentação NestJS Workspaces](https://docs.nestjs.com/cli/monorepo#workspaces)
- [NestJS Microservices](https://docs.nestjs.com/microservices/basics)
- [RabbitMQ com NestJS](https://docs.nestjs.com/microservices/rabbitmq)
- [Artillery](https://www.artillery.io/docs/get-started/get-artillery)


## ⚡ Pré-requisitos

Antes de começar, instale as dependências globais:

```bash
# Instalar o NestJS CLI, caso não tenha
npm i -g @nestjs/cli
```

## 🏗️ Criar Monorepositório e Estruturar os Microsserviços com workspaces

```bash
# Criar o projeto principal
nest new gateway

# Entrar na pasta do projeto
cd gateway

# Criar os micro serviços
nest generate app order-stock
nest generate app order-payment
nest generate app order-fraight
nest generate app order-allocator
nest generate app order-fiscal
nest generate app order-dispatcher
nest generate app order-printer
nest generate app order-itinerary
nest generate app order-tracker
nest generate app order-notifier
nest generate app order-review
nest generate app order-integrate

# Renomear o diretório principal
cd ..
mv gateway ms-order-system
```

Agora temos um monorepositório estruturado com NestJS Workspaces.

## 🛠️ Centralizando e Validando Variáveis de Ambiente com Zod

1️⃣ As variáveis de ambiente são validadas e centralizadas em uma única biblioteca (@app/env).

2️⃣ Ao criar novas variáveis de ambiente, adicione ao arquivo: libs/env/src/lib/env.ts com a validação necessária.

🚀 Qualquer microserviço pode acessar as variáveis validadas importando @app/env:

```bash
import { env } from '@app/env';

console.log("🚀 RabbitMQ conectado em:", env.RABBITMQ_URI);
```

## 🐳 Configurar Docker com PostgreSQL e RabbitMQ

Crie um docker-compose.yml na raiz do projeto para rodar o PostgreSQL, RabbitMQ e TimescaleDB.

📌 Crie e edite o arquivo docker-compose.yml:

```bash
networks:
  ms-order-network:

services:
  postgres:
    image: timescale/timescaledb-ha:pg16.4-ts2.17.1
    container_name: postgres
    restart: always
    environment:
      POSTGRES_USERNAME: ${POSTGRES_USERNAME}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
      POSTGRES_NAME: ${POSTGRES_NAME}
    ports:
      - '5432:5432'
    user: root
    volumes:
      - pgdata:/var/lib/postgresql/data/
    networks:
      - ms-order-network

  rabbitmq:
    image: rabbitmq:3-management
    container_name: rabbitmq
    restart: always
    ports:
      - "5672:5672"
      - "15672:15672"
    networks:
      - ms-order-network

volumes:
  pgdata:
```

🚀 Suba os containers:

```bash
docker-compose up -d
```

## 🔗 Configurar Comunicação entre Microsserviços (HTTP, TCP e RabbitMQ)

Instalar os pacotes necessários, conforme [Documentação MicroServices](https://docs.nestjs.com/microservices/basics) e [Documentação RabbitMQ](https://docs.nestjs.com/microservices/rabbitmq)

```bash
pnpm add @nestjs/microservices amqplib amqp-connection-manager @golevelup/nestjs-rabbitmq
```

## 📝 Configurando RabbitMQ Exchange - Fanout

1️⃣ Importar RMQModule nos módulos publishers e consumers

2️⃣ Utilizar o decorator @RabbitSubscribe no método de handle da mensagem, deve ser utilizado em uma classe injetavel

3️⃣ Publicar eventos com amqpConnection

✅ Isso permite comunicação eficiente entre microsserviços via TCP e RabbitMQ.


## 🚀 Configurar o Gateway com GraphQL Apollo Federation

Agora instalamos o Apollo Federation:

```bash
pnpm add @nestjs/graphql @nestjs/apollo graphql apollo-server-expres@apollo/gatewayay
```

### 📝 Configurar main.ts no Gateway

📌 Edite o arquivo apps/gateway/src/main.ts:

```bash
import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
```

### 📝 Configurar gateway.module.ts para Apollo Federation + TCP

📌 Edite o arquivo apps/gateway/src/gateway.module.ts para suportar GraphQL Federation + TCP:

```bash
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { GatewayController } from './gateway.controller';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      gateway: {
        supergraphSdl: new IntrospectAndCompose({
          subgraphs: [
            { name: 'order-stock', url: 'http://localhost:3011/graphql' },
          ],
        }),
      },
    }),
    ClientsModule.register([
      {
        name: 'ORDER_STOCK_SERVICE',
        transport: Transport.TCP,
        options: { host: 'localhost', port: 3021 }, // Porta do TCP
      },
    ]),
  ],
  controllers: [GatewayController],
})
export class GatewayModule {}
```

✅ Agora, o Apollo Federation une os microsserviços via HTTP, e o TCP permite comunicação direta.

## 📡 Configurar um Microsserviço com GraphQL + TCP (order-stock)

### 📝 Configurar order-stock.module.ts

📌 Edite apps/order-stock/src/order-stock.module.ts:

```bash
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { OrdersStockResolver } from './order-stock.resolver';
import { OrderStockService } from './order-stock.service';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: { federation: 2 },
    }),
  ],
  providers: [OrdersStockResolver, OrderStockService],
})
export class OrderStockModule {}
```

### 📝 Configurar main.ts para rodar GraphQL + TCP

📌 Edite apps/order-stock/src/main.ts:

```bash
import { NestFactory } from '@nestjs/core';
import { OrderStockModule } from './order-stock.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(OrderStockModule);
  app.enableCors();
  await app.listen(3011);

  const microservice = await NestFactory.createMicroservice<MicroserviceOptions>(
    OrderStockModule,
    {
      transport: Transport.TCP,
      options: { host: 'localhost', port: 3021 },
    },
  );

  await microservice.listen();
  console.log('✅ OrderStock rodando como Federation (3011) e TCP (3021)');
}

bootstrap();
```

✅ Agora o order-stock suporta GraphQL via HTTP e TCP para comunicação interna.

Implemente o Resolver, a Model e a Service do microserviço. 
* A model deve ter um decorator @Directive, informando key e tag. Isto é um requisito para funcionar como subgraphs.

## 🎯 Testando a Configuração

📌 Rodar todos os microsserviços simultaneamente:

```bash
$ pnpm install
```

```bash
pnpm run start:all
```

📌 Testar se o Gateway GraphQL está funcionando:

```bash
curl http://localhost:3000/graphql
```

## 🎯 Teste de carga

Para executar o teste de carga execute o comando:
```bash
artillery run tests/load/audit-events.yml 
```


#### 🎉🚀 Sua arquitetura NestJS suporta RabbitMQ, TimescaleDB, eventos assíncronos, GraphQL Apollo Federation e TCP! 🎉🚀


## 📢 Lista de Eventos Possíveis
Aqui está a lista de eventos que podem ser emitidos e consumidos pelos microsserviços:

### 📢 Eventos Relacionados a Pedidos
* **order_created** - Pedido foi criado e aguarda processamento.
* **order_stock_reserved** - O estoque foi reservado com sucesso.
* **order_stock_failed** - Falha na reserva de estoque (estoque insuficiente).
* **order_fraight_calculated** - O frete foi calculado com sucesso.
* **order_fraight_failed** - Falha no cálculo do frete.
* **order_new** - Pedido pronto para pagamento.
* **order_payment_pending** - Aguardando confirmação do pagamento.
* **order_payment_failed** - Falha na validação do pagamento.
* **order_paid** - Pagamento aprovado, pedido confirmado.
* **order_refunded** - Valor do pagamento estornado.
* **order_printed** - Pedido impresso para produção.
* **order_issued** - Nota fiscal emitida com sucesso.
* **order_allocated** - Pedido foi alocado para um motorista.
* **order_ready** - Pedido finalizado e pronto para despacho.
* **order_dispatched** - Pedido saiu para entrega.
* **order_delivered** - Pedido foi entregue ao cliente.
* **order_review_requested** - Cliente recebeu notificação para avaliar a entrega.