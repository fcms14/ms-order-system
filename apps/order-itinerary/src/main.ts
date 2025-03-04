import { NestFactory } from '@nestjs/core';
import { OrderItineraryModule } from './order-itinerary.module';

async function bootstrap() {
  const app = await NestFactory.create(OrderItineraryModule);
  await app.listen(process.env.port ?? 3006);
}
bootstrap();
