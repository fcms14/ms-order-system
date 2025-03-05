import { NestFactory } from '@nestjs/core';
import { OrderPaymentModule } from './order-payment.module';
import { env } from '@app/env';

async function bootstrap() {
  const app = await NestFactory.create(OrderPaymentModule);
  await app.listen(env.ORDER_PAYMENT_HTTP_PORT);
}
bootstrap();
