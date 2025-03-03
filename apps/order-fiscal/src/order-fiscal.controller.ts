import { Controller, Get } from '@nestjs/common';
import { OrderFiscalService } from './order-fiscal.service';

@Controller()
export class OrderFiscalController {
  constructor(private readonly orderFiscalService: OrderFiscalService) {}

  @Get()
  getHello(): string {
    return this.orderFiscalService.getHello();
  }
}
