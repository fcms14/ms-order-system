import { Controller, Get } from '@nestjs/common';
import { OrderNotifierService } from './order-notifier.service';

@Controller()
export class OrderNotifierController {
  constructor(private readonly orderNotifierService: OrderNotifierService) {}

  @Get()
  getHello(): string {
    return this.orderNotifierService.getHello();
  }
}
