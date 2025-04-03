import { Module } from '@nestjs/common';
import { RMQModule } from '@app/rmq';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { FrontlineResolver } from './frontline.resolver';
import { FrontlineService } from './frontline.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Frontline } from './entity/frontline.entity';
import { env } from '@app/env';

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
        orphanedTypes: [],
      },
    }),
  ],
  controllers: [],
  providers: [FrontlineResolver, FrontlineService],
})
export class FrontlineModule { }
