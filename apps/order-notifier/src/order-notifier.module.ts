import { Module } from '@nestjs/common';
import { OrderNotifierController } from './order-notifier.controller';
import { OrderNotifierService } from './order-notifier.service';

@Module({
  imports: [],
  controllers: [OrderNotifierController],
  providers: [OrderNotifierService],
})
export class OrderNotifierModule {}
