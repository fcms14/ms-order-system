import { Module } from '@nestjs/common';
import { RMQModule } from '@app/rmq';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { FrontlineResolver } from './frontline.resolver';
import { FrontlineService } from './frontline.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Frontline } from './entity/frontline.entity';
import { env } from '@app/env';
import { Wholesaler } from './dtos/wholesaler-extension';
import { WholesalerExtensionResolver } from './wholesaler-extension.resolver';
import { FrontlineController } from './frontline.controller';
import { WholesalerHasFrontlineResolver } from './wholesaler-has-frontline.resolver';
import { WholesalerHasFrontline } from './dtos/wholesaler-has-frontline';

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
    }),
    TypeOrmModule.forFeature([Frontline]),
    RMQModule,
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2,
      },
      buildSchemaOptions: {
        orphanedTypes: [Wholesaler, WholesalerHasFrontline],
      },
    }),
  ],
  controllers: [FrontlineController],
  providers: [FrontlineResolver, WholesalerHasFrontlineResolver, WholesalerExtensionResolver, FrontlineService],
})
export class FrontlineModule { }
