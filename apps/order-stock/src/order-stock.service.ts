import { Injectable, NotFoundException } from '@nestjs/common';
import { OrderStock } from './entity/order-stock.entity';
import { AmqpConnection, MessageHandlerErrorBehavior, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { ORDER_CREATED, ORDER_EXCHANGE_NAME, ORDER_PAID, ORDER_PAYMENT_FAILED } from '@app/rmq';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderStockCreate } from './dtos/order-stock-create';
import { OrderStockUpdate } from './dtos/order-stock-update';

@Injectable()
export class OrderStockService {
  constructor(
    @InjectRepository(OrderStock)
    private orderStockRepository: Repository<OrderStock>,
    private readonly amqpConnection: AmqpConnection,
  ) { }

  findOne(id: string): Promise<OrderStock | null> {
    return this.orderStockRepository.findOneBy({ id });
  }

  create(data: OrderStockCreate): Promise<OrderStock> {
    this.amqpConnection.publish(ORDER_EXCHANGE_NAME, ORDER_CREATED, { ...data, message: 'Order Stock Created' });
    return this.orderStockRepository.save(data)
  }

  async update(data: OrderStockUpdate): Promise<OrderStock | null> {
    try {
      await this.orderStockRepository.update(data.id, data)
    } catch (error) {
      throw new NotFoundException()
    }

    return await this.orderStockRepository.findOneBy({ id: data.id });
  }

  @RabbitSubscribe({ exchange: ORDER_EXCHANGE_NAME, routingKey: ORDER_CREATED, errorBehavior: MessageHandlerErrorBehavior.REQUEUE })
  handleOrderCreated(data: any) {
    console.log('🛒 ORDER_CREATED reservar estoque:', JSON.stringify(data));
  }

  @RabbitSubscribe({ exchange: ORDER_EXCHANGE_NAME, routingKey: ORDER_PAID, errorBehavior: MessageHandlerErrorBehavior.REQUEUE })
  handleOrderPaid(data: any) {
    console.log('🛒 ORDER_PAID da baixa no estoque', JSON.stringify(data));
  }

  @RabbitSubscribe({ exchange: ORDER_EXCHANGE_NAME, routingKey: ORDER_PAYMENT_FAILED, errorBehavior: MessageHandlerErrorBehavior.REQUEUE })
  handleOrderPaymentFailed(data: any) {
    console.log('🛒 ORDER_PAYMENT_FAILED Libera estoque bloqueado', JSON.stringify(data));
  }
}
