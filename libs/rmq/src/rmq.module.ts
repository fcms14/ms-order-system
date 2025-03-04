import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';

export const ORDER_EXCHANGE_NAME = 'order-events-exchange';
export const ORDER_ROUTING_KEY = 'order-created';

@Module({
  imports: [
    RabbitMQModule.forRoot({
      uri: 'amqp://localhost:5672',
      exchanges: [
        {
          name: ORDER_EXCHANGE_NAME,
          type: 'fanout'
        }
      ],
      connectionInitOptions: { wait: false },
      enableControllerDiscovery: false,
    }),
  ],
  exports: [RabbitMQModule],
})
export class RMQModule { }
