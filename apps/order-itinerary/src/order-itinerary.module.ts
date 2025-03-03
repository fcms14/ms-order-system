import { Module } from '@nestjs/common';
import { OrderItineraryController } from './order-itinerary.controller';
import { OrderItineraryService } from './order-itinerary.service';

@Module({
  imports: [],
  controllers: [OrderItineraryController],
  providers: [OrderItineraryService],
})
export class OrderItineraryModule {}
