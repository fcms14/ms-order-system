import { NestFactory } from '@nestjs/core';
import { OrderDispatcherModule } from './order-dispatcher.module';

async function bootstrap() {
  const app = await NestFactory.create(OrderDispatcherModule);
  await app.listen(process.env.port ?? 3002);
}
bootstrap();
