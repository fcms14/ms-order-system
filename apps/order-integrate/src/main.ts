import { NestFactory } from '@nestjs/core';
import { OrderIntegrateModule } from './order-integrate.module';

async function bootstrap() {
  const app = await NestFactory.create(OrderIntegrateModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
