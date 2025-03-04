import { Injectable } from '@nestjs/common';
import { OrderStock } from './order-stock.model';
import { MessageHandlerErrorBehavior, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { ORDER_EXCHANGE_NAME, ORDER_ROUTING_KEY } from '@app/rmq';

@Injectable()
export class OrderStockService {
  find(id: number): OrderStock {
    return {
      productId: id,
      available: 10
    };
  }

  @RabbitSubscribe({ exchange: ORDER_EXCHANGE_NAME, routingKey: ORDER_ROUTING_KEY, errorBehavior: MessageHandlerErrorBehavior.REQUEUE })
  handleOrderCreated(data: any) {
    console.log('🛒 Order received in OrderStock:', data);
  }
}
