import { NestFactory } from '@nestjs/core';
import { OrderTrackerModule } from './order-tracker.module';
import { env } from '@app/env';

async function bootstrap() {
  const app = await NestFactory.create(OrderTrackerModule);
  await app.listen(env.ORDER_TRACKER_HTTP_PORT);
}
bootstrap();
