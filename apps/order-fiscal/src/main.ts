import { NestFactory } from '@nestjs/core';
import { OrderFiscalModule } from './order-fiscal.module';

async function bootstrap() {
  const app = await NestFactory.create(OrderFiscalModule);
  await app.listen(process.env.port ?? 3003);
}
bootstrap();
