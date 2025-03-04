import { NestFactory } from '@nestjs/core';
import { OrderNotifierModule } from './order-notifier.module';

async function bootstrap() {
  const app = await NestFactory.create(OrderNotifierModule);
  await app.listen(process.env.port ?? 3007);
}
bootstrap();
