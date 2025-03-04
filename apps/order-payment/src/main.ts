import { NestFactory } from '@nestjs/core';
import { OrderPaymentModule } from './order-payment.module';

async function bootstrap() {
  const app = await NestFactory.create(OrderPaymentModule);
  await app.listen(process.env.port ?? 3008);
}
bootstrap();
