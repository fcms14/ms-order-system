import { Module } from '@nestjs/common';
import { OrderTrackerController } from './order-tracker.controller';
import { OrderTrackerService } from './order-tracker.service';

@Module({
  imports: [],
  controllers: [OrderTrackerController],
  providers: [OrderTrackerService],
})
export class OrderTrackerModule {}
