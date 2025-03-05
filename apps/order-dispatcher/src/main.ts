import { NestFactory } from '@nestjs/core';
import { OrderDispatcherModule } from './order-dispatcher.module';
import { env } from '@app/env';

async function bootstrap() {
  const app = await NestFactory.create(OrderDispatcherModule);
  await app.listen(env.ORDER_DISPATCHER_HTTP_PORT);
}
bootstrap();
