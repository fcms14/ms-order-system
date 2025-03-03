import { Controller, Get } from '@nestjs/common';
import { OrderFraightService } from './order-fraight.service';

@Controller()
export class OrderFraightController {
  constructor(private readonly orderFraightService: OrderFraightService) {}

  @Get()
  getHello(): string {
    return this.orderFraightService.getHello();
  }
}
