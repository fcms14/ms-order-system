import { Module } from '@nestjs/common';
import { OrderFraightController } from './order-fraight.controller';
import { OrderFraightService } from './order-fraight.service';

@Module({
  imports: [],
  controllers: [OrderFraightController],
  providers: [OrderFraightService],
})
export class OrderFraightModule {}
