import { NestFactory } from '@nestjs/core';
import { OrderIntegrateModule } from './order-integrate.module';
import { env } from '@app/env';

async function bootstrap() {
  const app = await NestFactory.create(OrderIntegrateModule);
  await app.listen(env.ORDER_INTEGRATE_HTTP_PORT);
}
bootstrap();
