import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { OrderFraightModule } from './order-fraight.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    OrderFraightModule,
    {
      transport: Transport.TCP,
      options: { host: 'localhost', port: 3004 },
    },
  );
  await app.listen();

  console.log('✅ OrderFraight rodando como Federation (3004)');
}
bootstrap();