import { NestFactory } from '@nestjs/core';
import { FrontlineModule } from './frontline.module';
import { env } from '../../../libs/env/src';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(FrontlineModule);
  await app.listen(env.FRONTLINE_HTTP_PORT);

  console.log(`✅ Frontline rodando como Federation (${env.FRONTLINE_HTTP_PORT})`);

  const ms = await NestFactory.createMicroservice<MicroserviceOptions>(
    FrontlineModule,
    {
      transport: Transport.TCP,
      options: { host: 'frontline', port: env.FRONTLINE_TCP_PORT },
    },
  );
  await ms.listen();
}
bootstrap();
