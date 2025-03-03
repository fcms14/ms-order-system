import { Module } from '@nestjs/common';
import { OrderReviewController } from './order-review.controller';
import { OrderReviewService } from './order-review.service';

@Module({
  imports: [],
  controllers: [OrderReviewController],
  providers: [OrderReviewService],
})
export class OrderReviewModule {}
