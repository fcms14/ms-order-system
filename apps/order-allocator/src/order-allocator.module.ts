import { Module } from '@nestjs/common';
import { OrderAllocatorController } from './order-allocator.controller';
import { OrderAllocatorService } from './order-allocator.service';

@Module({
  imports: [],
  controllers: [OrderAllocatorController],
  providers: [OrderAllocatorService],
})
export class OrderAllocatorModule {}
