import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { IntrospectAndCompose } from '@apollo/gateway';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ORDER_FRAIGHT_SERVICE',
        transport: Transport.TCP,
        options: { host: 'localhost', port: 3004 },
      },
    ]),
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
    // ClientsModule.register([
    //   {
    //     name: 'ORDER_STOCK_SERVICE',
    //     transport: Transport.TCP,
    //     options: { host: 'localhost', port: 3011 },
    //   },
    // ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
