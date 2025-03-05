import { NestFactory } from '@nestjs/core';
import { OrderPrinterModule } from './order-printer.module';
import { env } from '@app/env';

async function bootstrap() {
  const app = await NestFactory.create(OrderPrinterModule);
  await app.listen(env.ORDER_PRINTER_HTTP_PORT);
}
bootstrap();
