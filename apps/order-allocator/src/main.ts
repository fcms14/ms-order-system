import { NestFactory } from '@nestjs/core';
import { OrderAllocatorModule } from './order-allocator.module';
import { env } from '@app/env';

async function bootstrap() {
  const app = await NestFactory.create(OrderAllocatorModule);
  await app.listen(env.ORDER_ALLOCATOR_HTTP_PORT);
}
bootstrap();
