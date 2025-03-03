import { Module } from '@nestjs/common';
import { OrderStockController } from './order-stock.controller';
import { OrderStockService } from './order-stock.service';

@Module({
  imports: [],
  controllers: [OrderStockController],
  providers: [OrderStockService],
})
export class OrderStockModule {}
