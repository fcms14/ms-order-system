import { Controller, Get } from '@nestjs/common';
import { OrderPrinterService } from './order-printer.service';

@Controller()
export class OrderPrinterController {
  constructor(private readonly orderPrinterService: OrderPrinterService) {}

  @Get()
  getHello(): string {
    return this.orderPrinterService.getHello();
  }
}
