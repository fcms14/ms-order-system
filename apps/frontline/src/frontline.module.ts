import { Module } from '@nestjs/common';
import { RMQModule } from '@app/rmq';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { FrontlineResolver } from './frontline.resolver';
import { FrontlineService } from './frontline.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Frontline } from './entity/frontline.entity';
import { env } from '@app/env';
import { Wholesaler } from './object-types/frontline-belongs-to-wholesaler';
import { FrontlineBelongsToWholesalerResolver } from './resolvers/frontline-belongs-to-wholesaler.resolver';
import { FrontlineByRegionResolver } from './resolvers/frontline-by-region.resolver';
import { FrontlineByRegion } from './object-types/frontline-by-region';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: env.POSTGRES_HOST,
      port: env.POSTGRES_PORT,
      username: env.POSTGRES_USERNAME,
      password: env.POSTGRES_PASSWORD,
      database: env.FRONTLINE_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
    }),
    TypeOrmModule.forFeature([Frontline]),
    RMQModule,
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2,
      },
      buildSchemaOptions: {
        orphanedTypes: [Wholesaler, FrontlineByRegion],
      },
    }),
  ],
  controllers: [],
  providers: [
    FrontlineResolver,
    FrontlineBelongsToWholesalerResolver,
    FrontlineService,
    FrontlineByRegionResolver,
  ],
})
export class FrontlineModule { }
