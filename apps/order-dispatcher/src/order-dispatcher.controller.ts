import { Controller, Get } from '@nestjs/common';
import { OrderDispatcherService } from './order-dispatcher.service';

@Controller()
export class OrderDispatcherController {
  constructor(private readonly orderDispatcherService: OrderDispatcherService) {}

  @Get()
  getHello(): string {
    return this.orderDispatcherService.getHello();
  }
}
