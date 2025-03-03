import { Module } from '@nestjs/common';
import { OrderPrinterController } from './order-printer.controller';
import { OrderPrinterService } from './order-printer.service';

@Module({
  imports: [],
  controllers: [OrderPrinterController],
  providers: [OrderPrinterService],
})
export class OrderPrinterModule {}
