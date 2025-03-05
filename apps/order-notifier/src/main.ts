import { NestFactory } from '@nestjs/core';
import { OrderNotifierModule } from './order-notifier.module';
import { env } from '@app/env';

async function bootstrap() {
  const app = await NestFactory.create(OrderNotifierModule);
  await app.listen(env.ORDER_NOTIFIER_HTTP_PORT);
}
bootstrap();
