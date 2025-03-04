
# 🏗️ Passo a passo para criar o monorepositório NestJS com microservices, RabbitMQ, TimescaleDB, event-driven, GraphQl Apollo Federation 

[Documentação workspaces](https://docs.nestjs.com/cli/monorepo#workspaces)

## ⚡ Pré-requisitos
```bash
# Instalar o NestJS CLI, caso não tenha
npm i -g @nestjs/cli
```

## 🏗️ Criar workspaces e base dos micros serviços

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

## 🐳 Configurar o Docker com PostgreSQL e RabbitMQ para todos os serviços

Crie um docker-compose.yml na raiz do projeto para rodar o PostgreSQL, RabbitMQ e TimescaleDB.

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

## 🔗 Configurar a comunicação entre microsserviços

Instalar o pacote microservices do nestjs e amqplib, conforme [Documentação MicroServices](https://docs.nestjs.com/microservices/basics) e [Documentação RabbitMQ](https://docs.nestjs.com/microservices/rabbitmq)

```bash
npm i --save @nestjs/microservices

npm i --save amqplib amqp-connection-manager
```


## 🚀 Criar um serviço centralizado para GraphQL Federation
Agora, no gateway (services/gateway), instale o Apollo Federation:

```bash
cd apps/gateway
pnpm add @nestjs/graphql @nestjs/apollo graphql apollo-server-expres@apollo/gatewayay
```
### 📝 Configurar o Gateway (GraphQL Federation)

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

📌 Edite o arquivo apps/gateway/src/gateway.module.ts para conectar os microsserviços:

```bash
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      gateway: {
        serviceList: [
          { name: 'order-stock', url: 'http://localhost:3001/graphql' },
          { name: 'order-payment', url: 'http://localhost:3002/graphql' },
          { name: 'order-fraight', url: 'http://localhost:3003/graphql' },
        ],
      },
    }),
  ],
})
export class GatewayModule {}
```

Agora, o Apollo Federation unirá os microsserviços order-stock, order-payment, order-freight (e os demais) em um único ponto de acesso GraphQL.

## 🎯 Finalizando a Configuração e Testando

📌 Rodar todos os microsserviços simultaneamente:

```bash
pnpm run start:all
```

📌 Testar se o Gateway GraphQL está funcionando:

```bash
curl http://localhost:3000/graphql
```

#### 🎉🚀 Agora, sua arquitetura de monorepositório NestJS está configurada com RabbitMQ, TimescaleDB, eventos assíncronos e GraphQL Apollo Federation! 🎉🚀