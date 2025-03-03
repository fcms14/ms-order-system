import { Module } from '@nestjs/common';
import { OrderPaymentController } from './order-payment.controller';
import { OrderPaymentService } from './order-payment.service';

@Module({
  imports: [],
  controllers: [OrderPaymentController],
  providers: [OrderPaymentService],
})
export class OrderPaymentModule {}
