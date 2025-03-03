import { NestFactory } from '@nestjs/core';
import { OrderAllocatorModule } from './order-allocator.module';

async function bootstrap() {
  const app = await NestFactory.create(OrderAllocatorModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
