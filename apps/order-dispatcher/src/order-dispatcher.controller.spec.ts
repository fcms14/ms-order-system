import { Test, TestingModule } from '@nestjs/testing';
import { OrderDispatcherController } from './order-dispatcher.controller';
import { OrderDispatcherService } from './order-dispatcher.service';

describe('OrderDispatcherController', () => {
  let orderDispatcherController: OrderDispatcherController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [OrderDispatcherController],
      providers: [OrderDispatcherService],
    }).compile();

    orderDispatcherController = app.get<OrderDispatcherController>(OrderDispatcherController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(orderDispatcherController.getHello()).toBe('Hello World!');
    });
  });
});
