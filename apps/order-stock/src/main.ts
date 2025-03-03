import { NestFactory } from '@nestjs/core';
import { OrderStockModule } from './order-stock.module';

async function bootstrap() {
  const app = await NestFactory.create(OrderStockModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
