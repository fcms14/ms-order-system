import { Controller, Get } from '@nestjs/common';
import { OrderIntegrateService } from './order-integrate.service';

@Controller()
export class OrderIntegrateController {
  constructor(private readonly orderIntegrateService: OrderIntegrateService) {}

  @Get()
  getHello(): string {
    return this.orderIntegrateService.getHello();
  }
}
