import { Controller, Get } from '@nestjs/common';
import { OrderTrackerService } from './order-tracker.service';

@Controller()
export class OrderTrackerController {
  constructor(private readonly orderTrackerService: OrderTrackerService) {}

  @Get()
  getHello(): string {
    return this.orderTrackerService.getHello();
  }
}
