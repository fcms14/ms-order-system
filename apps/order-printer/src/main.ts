import { NestFactory } from '@nestjs/core';
import { OrderPrinterModule } from './order-printer.module';

async function bootstrap() {
  const app = await NestFactory.create(OrderPrinterModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
