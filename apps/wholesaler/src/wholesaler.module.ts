import { Module } from '@nestjs/common';
import { RMQModule } from '@app/rmq';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { WholesalerResolver } from './wholesaler.resolver';
import { WholesalerService } from './wholesaler.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wholesaler } from './entity/wholesaler.entity';
import { env } from '@app/env';
import { State } from './entity/state.entity';
import { Region } from './entity/region.entity';
import { FrontlineExtensionResolver } from './frontline-extension.resolver';
import { Frontline } from './dtos/frontline-extension';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: env.POSTGRES_HOST,
      port: env.POSTGRES_PORT,
      username: env.POSTGRES_USERNAME,
      password: env.POSTGRES_PASSWORD,
      database: env.WHOLESALER_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Wholesaler, State, Region]),
    RMQModule,
    ClientsModule.register([
      {
        name: 'FRONTLINE_SERVICE',
        transport: Transport.TCP,
        options: { host: 'frontline', port: env.FRONTLINE_TCP_PORT },
      },
    ]),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2,
      },
      buildSchemaOptions: {
        orphanedTypes: [Frontline],
      },
    }),
  ],
  providers: [WholesalerResolver, FrontlineExtensionResolver, WholesalerService],
})
export class WholesalerModule { }
