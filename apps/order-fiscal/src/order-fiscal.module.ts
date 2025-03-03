import { Module } from '@nestjs/common';
import { OrderFiscalController } from './order-fiscal.controller';
import { OrderFiscalService } from './order-fiscal.service';

@Module({
  imports: [],
  controllers: [OrderFiscalController],
  providers: [OrderFiscalService],
})
export class OrderFiscalModule {}
