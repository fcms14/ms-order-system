import { Module } from '@nestjs/common';
import { OrderIntegrateController } from './order-integrate.controller';
import { OrderIntegrateService } from './order-integrate.service';

@Module({
  imports: [],
  controllers: [OrderIntegrateController],
  providers: [OrderIntegrateService],
})
export class OrderIntegrateModule {}
