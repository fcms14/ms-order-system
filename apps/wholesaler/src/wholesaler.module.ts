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
import { Frontline } from './object-types/wholesaler-has-frontline';
import { WholesalerHasFrontlineResolver } from './resolvers/wholesaler-has-frontline.resolver';
import { RegionResolver } from './resolvers/region.resolver';

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
  providers: [RegionResolver, WholesalerResolver, WholesalerHasFrontlineResolver, WholesalerService],
})
export class WholesalerModule { }
