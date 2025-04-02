import { NestFactory } from '@nestjs/core';
import { FrontlineModule } from './frontline.module';
import { env } from '../../../libs/env/src';

async function bootstrap() {
  const app = await NestFactory.create(FrontlineModule);
  await app.listen(env.FRONTLINE_HTTP_PORT ?? 3000);

  console.log(`✅ OrderStock rodando como Federation (${env.FRONTLINE_HTTP_PORT})`);
}
bootstrap();
