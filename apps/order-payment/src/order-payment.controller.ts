import { Controller, Get } from '@nestjs/common';
import { OrderPaymentService } from './order-payment.service';

@Controller()
export class OrderPaymentController {
  constructor(private readonly orderPaymentService: OrderPaymentService) {}

  @Get()
  getHello(): string {
    return this.orderPaymentService.getHello();
  }
}
