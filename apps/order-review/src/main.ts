import { NestFactory } from '@nestjs/core';
import { OrderReviewModule } from './order-review.module';
import { env } from '@app/env';

async function bootstrap() {
  const app = await NestFactory.create(OrderReviewModule);
  await app.listen(env.ORDER_REVIEW_HTTP_PORT);
}
bootstrap();
