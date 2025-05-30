import { Injectable } from '@nestjs/common';
import { MessageHandlerErrorBehavior, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { ORDER_ALLOCATED, ORDER_CREATED, ORDER_EXCHANGE_NAME } from '@app/rmq';

@Injectable()
export class OrderFraightService {
  getHello(): string {
    return 'Hello World!';
  }

  @RabbitSubscribe({ exchange: ORDER_EXCHANGE_NAME, routingKey: ORDER_CREATED, errorBehavior: MessageHandlerErrorBehavior.REQUEUE })
  handleOrderCreated(data: any) {
    console.log('🚀 ORDER_CREATED fraight calculate:', JSON.stringify(data));
  }

  @RabbitSubscribe({ exchange: ORDER_EXCHANGE_NAME, routingKey: ORDER_ALLOCATED, errorBehavior: MessageHandlerErrorBehavior.REQUEUE })
  handleOrderAllocated(data: any, context: any) {
    console.log('🚀 ORDER_ALLOCATED example behavior:', JSON.stringify(data));
  }
}
