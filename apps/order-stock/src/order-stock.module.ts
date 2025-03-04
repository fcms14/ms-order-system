import { Module } from '@nestjs/common';
import { RMQModule } from '@app/rmq';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { OrdersStockResolver } from './order-stock.resolver';
import { OrderStockService } from './order-stock.service';

@Module({
  imports: [
    RMQModule,
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2,
      },
    }),
  ],
  providers: [OrdersStockResolver, OrderStockService],
})
export class OrderStockModule { }
