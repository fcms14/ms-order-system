import { Test, TestingModule } from '@nestjs/testing';
import { OrderNotifierController } from './order-notifier.controller';
import { OrderNotifierService } from './order-notifier.service';

describe('OrderNotifierController', () => {
  let orderNotifierController: OrderNotifierController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [OrderNotifierController],
      providers: [OrderNotifierService],
    }).compile();

    orderNotifierController = app.get<OrderNotifierController>(OrderNotifierController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(orderNotifierController.getHello()).toBe('Hello World!');
    });
  });
});
