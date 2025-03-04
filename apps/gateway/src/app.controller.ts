import { Controller, Get, Inject, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { ORDER_EXCHANGE_NAME, ORDER_ROUTING_KEY } from '@app/rmq';

@Controller('fraight')
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('ORDER_FRAIGHT_SERVICE') private readonly orderFraightClient: ClientProxy,
    private readonly amqpConnection: AmqpConnection,
  ) { }

  @Get('test-rmq')
  testRmq(): { message: string, order: { orderId: number } } {
    const orderEvent = { orderId: Math.floor(Math.random() * 1000) };

    this.amqpConnection.publish(ORDER_EXCHANGE_NAME, ORDER_ROUTING_KEY, orderEvent);

    return { message: 'Order event published', order: orderEvent };
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('sum')
  async getSum(@Query('numbers') numbers: string) {
    const parsedNumbers = numbers.split(',').map(Number);

    const result = await firstValueFrom(
      this.orderFraightClient.send({ cmd: 'sum' }, parsedNumbers),
    );

    return { result };
  }
}
