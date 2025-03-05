import { NestFactory } from '@nestjs/core';
import { OrderStockModule } from './order-stock.module';
import { env } from '@app/env';

async function bootstrap() {
  const app = await NestFactory.create(OrderStockModule);
  app.enableCors();
  await app.listen(env.ORDER_STOCK_HTTP_PORT);

  console.log(`✅ OrderStock rodando como Federation (${env.ORDER_STOCK_HTTP_PORT})`);
}

bootstrap();