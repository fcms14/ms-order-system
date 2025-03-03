import { Controller, Get } from '@nestjs/common';
import { OrderStockService } from './order-stock.service';

@Controller()
export class OrderStockController {
  constructor(private readonly orderStockService: OrderStockService) {}

  @Get()
  getHello(): string {
    return this.orderStockService.getHello();
  }
}
