import { NestFactory } from '@nestjs/core';
import { OrderFraightModule } from './order-fraight.module';

async function bootstrap() {
  const app = await NestFactory.create(OrderFraightModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
