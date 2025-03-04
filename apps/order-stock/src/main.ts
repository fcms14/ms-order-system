import { NestFactory } from '@nestjs/core';
import { OrderStockModule } from './order-stock.module';

async function bootstrap() {
  const app = await NestFactory.create(OrderStockModule);
  app.enableCors();
  await app.listen(3011); // Rodando na porta correta para Federation
}
bootstrap();
