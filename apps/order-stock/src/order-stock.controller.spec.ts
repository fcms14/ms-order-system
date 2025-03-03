import { Test, TestingModule } from '@nestjs/testing';
import { OrderStockController } from './order-stock.controller';
import { OrderStockService } from './order-stock.service';

describe('OrderStockController', () => {
  let orderStockController: OrderStockController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [OrderStockController],
      providers: [OrderStockService],
    }).compile();

    orderStockController = app.get<OrderStockController>(OrderStockController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(orderStockController.getHello()).toBe('Hello World!');
    });
  });
});
