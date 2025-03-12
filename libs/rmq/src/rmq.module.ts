import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { env } from '@app/env';
import { ORDER_EXCHANGE_NAME } from './rmq.events';

@Module({
  imports: [
    RabbitMQModule.forRoot({
      uri: env.RABBITMQ_URI,
      exchanges: [
        {
          name: ORDER_EXCHANGE_NAME,
          type: 'topic',
          createExchangeIfNotExists: true
        }
      ],
      connectionInitOptions: { wait: false },
      enableControllerDiscovery: false,
    }),
  ],
  exports: [RabbitMQModule],
})
export class RMQModule { }
