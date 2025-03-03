import { Test, TestingModule } from '@nestjs/testing';
import { OrderTrackerController } from './order-tracker.controller';
import { OrderTrackerService } from './order-tracker.service';

describe('OrderTrackerController', () => {
  let orderTrackerController: OrderTrackerController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [OrderTrackerController],
      providers: [OrderTrackerService],
    }).compile();

    orderTrackerController = app.get<OrderTrackerController>(OrderTrackerController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(orderTrackerController.getHello()).toBe('Hello World!');
    });
  });
});
