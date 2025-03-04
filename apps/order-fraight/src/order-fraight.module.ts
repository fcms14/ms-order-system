import { Module } from '@nestjs/common';
import { RMQModule } from '@app/rmq';
import { OrderFraightController } from './order-fraight.controller';
import { OrderFraightService } from './order-fraight.service';

@Module({
  imports: [RMQModule],
  controllers: [OrderFraightController],
  providers: [OrderFraightService],
})
export class OrderFraightModule { }
