import { NestFactory } from '@nestjs/core';
import { OrderTrackerModule } from './order-tracker.module';

async function bootstrap() {
  const app = await NestFactory.create(OrderTrackerModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
