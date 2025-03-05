import { NestFactory } from '@nestjs/core';
import { OrderFiscalModule } from './order-fiscal.module';
import { env } from '@app/env';

async function bootstrap() {
  const app = await NestFactory.create(OrderFiscalModule);
  await app.listen(env.ORDER_FISCAL_HTTP_PORT);
}
bootstrap();
