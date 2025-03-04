import { Injectable } from '@nestjs/common';
import { MessageHandlerErrorBehavior, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { ORDER_EXCHANGE_NAME, ORDER_ROUTING_KEY } from '@app/rmq';

@Injectable()
export class OrderFraightService {
  getHello(): string {
    return 'Hello World!';
  }

    @RabbitSubscribe({ exchange: ORDER_EXCHANGE_NAME, routingKey: ORDER_ROUTING_KEY, errorBehavior: MessageHandlerErrorBehavior.REQUEUE })
    handleOrderCreated(data: any) {
      console.log('🛒 Order received in OrderFraight:', data);
    }
}
