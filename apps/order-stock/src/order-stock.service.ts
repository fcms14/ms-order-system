import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { OrderStock } from './entity/order-stock.entity';
import { MessageHandlerErrorBehavior, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { ORDER_CREATED, ORDER_EXCHANGE_NAME, ORDER_PAID, ORDER_PAYMENT_FAILED } from '@app/rmq';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { OrderStockCreate } from './dtos/order-stock-create';
import { OrderStockUpdate } from './dtos/order-stock-update';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, firstValueFrom, throwError } from 'rxjs';

@Injectable()
export class OrderStockService {
  constructor(
    @InjectRepository(OrderStock)
    private orderStockRepository: Repository<OrderStock>,
    @Inject('RABBITMQ_SERVICE') private readonly client: ClientProxy,
    private dataSource: DataSource
  ) { }

  findOne(id: string): Promise<OrderStock | null> {
    return this.orderStockRepository.findOneBy({ id });
  }

  create(data: OrderStockCreate): Promise<OrderStock> {
    const response = this.client.send(ORDER_CREATED, { ...data, message: 'Order Stock Created' }).subscribe();
    console.log(response)
    return this.orderStockRepository.save(data)
  }

  async update(data: OrderStockUpdate): Promise<OrderStock | null> {
    try {
      await this.orderStockRepository.update(data.id, data)
    } catch (error) {
      throw new NotFoundException()
    }

    const found = this.orderStockRepository.findOneBy({ id: data.id });
    return found

  }

  @RabbitSubscribe({ exchange: ORDER_EXCHANGE_NAME, routingKey: ORDER_CREATED, errorBehavior: MessageHandlerErrorBehavior.REQUEUE })
  handleOrderCreated(data: any) {
    console.log('🛒 Order reservar estoque:', data);
  }

  @RabbitSubscribe({ exchange: ORDER_EXCHANGE_NAME, routingKey: ORDER_PAID, errorBehavior: MessageHandlerErrorBehavior.REQUEUE })
  handleOrderPaid(data: any) {
    console.log('🛒 Order da baixa no estoque', data);
  }

  @RabbitSubscribe({ exchange: ORDER_EXCHANGE_NAME, routingKey: ORDER_PAYMENT_FAILED, errorBehavior: MessageHandlerErrorBehavior.REQUEUE })
  handleOrderPaymentFailed(data: any) {
    console.log('🛒 libera estoque bloqueado', data);
  }
}
