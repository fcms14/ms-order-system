import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { OrderFraightModule } from './order-fraight.module';
import { env } from '@app/env';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    OrderFraightModule,
    {
      transport: Transport.TCP,
      options: { host: 'order-fraight', port: env.ORDER_FRAIGHT_TCP_PORT },
    },
  );
  await app.listen();
}
bootstrap();