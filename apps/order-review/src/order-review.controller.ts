import { Controller, Get } from '@nestjs/common';
import { OrderReviewService } from './order-review.service';

@Controller()
export class OrderReviewController {
  constructor(private readonly orderReviewService: OrderReviewService) {}

  @Get()
  getHello(): string {
    return this.orderReviewService.getHello();
  }
}
