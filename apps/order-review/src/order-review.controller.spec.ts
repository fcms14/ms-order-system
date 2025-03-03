import { Test, TestingModule } from '@nestjs/testing';
import { OrderReviewController } from './order-review.controller';
import { OrderReviewService } from './order-review.service';

describe('OrderReviewController', () => {
  let orderReviewController: OrderReviewController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [OrderReviewController],
      providers: [OrderReviewService],
    }).compile();

    orderReviewController = app.get<OrderReviewController>(OrderReviewController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(orderReviewController.getHello()).toBe('Hello World!');
    });
  });
});
