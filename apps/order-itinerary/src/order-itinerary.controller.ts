import { Controller, Get } from '@nestjs/common';
import { OrderItineraryService } from './order-itinerary.service';

@Controller()
export class OrderItineraryController {
  constructor(private readonly orderItineraryService: OrderItineraryService) {}

  @Get()
  getHello(): string {
    return this.orderItineraryService.getHello();
  }
}
