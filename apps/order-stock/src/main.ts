import { NestFactory } from '@nestjs/core';
import { OrderStockModule } from './order-stock.module';

async function bootstrap() {
  const app = await NestFactory.create(OrderStockModule);
  app.enableCors();
  await app.listen(3011);

  console.log('✅ OrderStock rodando como Federation (3011)');
}

bootstrap();