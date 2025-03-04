import { Controller } from '@nestjs/common';
import { OrderFraightService } from './order-fraight.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class OrderFraightController {
  constructor(private readonly orderFraightService: OrderFraightService) { }

  @MessagePattern({ cmd: 'sum' })
  async accumulate(data: number[]): Promise<number> {
    return (data || []).reduce((a, b) => a + b);
  }
}
