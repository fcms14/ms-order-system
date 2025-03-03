import { Test, TestingModule } from '@nestjs/testing';
import { OrderPrinterController } from './order-printer.controller';
import { OrderPrinterService } from './order-printer.service';

describe('OrderPrinterController', () => {
  let orderPrinterController: OrderPrinterController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [OrderPrinterController],
      providers: [OrderPrinterService],
    }).compile();

    orderPrinterController = app.get<OrderPrinterController>(OrderPrinterController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(orderPrinterController.getHello()).toBe('Hello World!');
    });
  });
});
