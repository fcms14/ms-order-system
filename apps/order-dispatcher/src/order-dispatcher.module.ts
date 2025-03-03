import { Module } from '@nestjs/common';
import { OrderDispatcherController } from './order-dispatcher.controller';
import { OrderDispatcherService } from './order-dispatcher.service';

@Module({
  imports: [],
  controllers: [OrderDispatcherController],
  providers: [OrderDispatcherService],
})
export class OrderDispatcherModule {}
