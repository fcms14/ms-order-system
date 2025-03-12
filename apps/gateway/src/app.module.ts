import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { IntrospectAndCompose } from '@apollo/gateway';
import { RMQModule } from '@app/rmq';
import { env } from '@app/env';

@Module({
  imports: [
    RMQModule,
    ClientsModule.register([
      {
        name: 'ORDER_FRAIGHT_SERVICE',
        transport: Transport.TCP,
        options: { host: 'order-fraight', port: env.ORDER_FRAIGHT_TCP_PORT },
      },
    ]),
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      gateway: {
        supergraphSdl: new IntrospectAndCompose({
          subgraphs: [
            { name: env.ORDER_STOCK_DATABASE, url: `http://order-stock:${env.ORDER_STOCK_HTTP_PORT}/graphql` },
          ],
        }),
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
