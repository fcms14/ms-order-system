import { Controller, Get } from '@nestjs/common';
import { OrderAllocatorService } from './order-allocator.service';

@Controller()
export class OrderAllocatorController {
  constructor(private readonly orderAllocatorService: OrderAllocatorService) {}

  @Get()
  getHello(): string {
    return this.orderAllocatorService.getHello();
  }
}
