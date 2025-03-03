import { Test, TestingModule } from '@nestjs/testing';
import { OrderFraightController } from './order-fraight.controller';
import { OrderFraightService } from './order-fraight.service';

describe('OrderFraightController', () => {
  let orderFraightController: OrderFraightController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [OrderFraightController],
      providers: [OrderFraightService],
    }).compile();

    orderFraightController = app.get<OrderFraightController>(OrderFraightController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(orderFraightController.getHello()).toBe('Hello World!');
    });
  });
});
