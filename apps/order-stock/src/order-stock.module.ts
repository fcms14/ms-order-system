import { Module } from '@nestjs/common';
import { RMQModule } from '@app/rmq';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { OrdersStockResolver } from './order-stock.resolver';
import { OrderStockService } from './order-stock.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderStock } from './entity/order-stock.entity';
import { env } from '@app/env';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: env.POSTGRES_HOST,
      port: env.POSTGRES_PORT,
      username: env.POSTGRES_USERNAME,
      password: env.POSTGRES_PASSWORD,
      database: 'order_stock',
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([OrderStock]),
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
