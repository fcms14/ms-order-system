import { Test, TestingModule } from '@nestjs/testing';
import { OrderFiscalController } from './order-fiscal.controller';
import { OrderFiscalService } from './order-fiscal.service';

describe('OrderFiscalController', () => {
  let orderFiscalController: OrderFiscalController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [OrderFiscalController],
      providers: [OrderFiscalService],
    }).compile();

    orderFiscalController = app.get<OrderFiscalController>(OrderFiscalController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(orderFiscalController.getHello()).toBe('Hello World!');
    });
  });
});
