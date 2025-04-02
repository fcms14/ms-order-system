import { NestFactory } from '@nestjs/core';
import { WholesalerModule } from './wholesaler.module';
import { env } from '@app/env';

async function bootstrap() {
  const app = await NestFactory.create(WholesalerModule);
  app.enableCors();
  await app.listen(env.WHOLESALER_HTTP_PORT);

  console.log(`✅ Wholesaler rodando como Federation (${env.WHOLESALER_HTTP_PORT})`);
}

bootstrap();