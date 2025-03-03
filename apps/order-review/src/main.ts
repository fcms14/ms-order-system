import { NestFactory } from '@nestjs/core';
import { OrderReviewModule } from './order-review.module';

async function bootstrap() {
  const app = await NestFactory.create(OrderReviewModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
