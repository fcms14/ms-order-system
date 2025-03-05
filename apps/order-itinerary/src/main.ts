import { NestFactory } from '@nestjs/core';
import { OrderItineraryModule } from './order-itinerary.module';
import { env } from '@app/env';

async function bootstrap() {
  const app = await NestFactory.create(OrderItineraryModule);
  await app.listen(env.ORDER_ITINERARY_HTTP_PORT);
}
bootstrap();
