import { Test, TestingModule } from '@nestjs/testing';
import { OrderPaymentController } from './order-payment.controller';
import { OrderPaymentService } from './order-payment.service';

describe('OrderPaymentController', () => {
  let orderPaymentController: OrderPaymentController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [OrderPaymentController],
      providers: [OrderPaymentService],
    }).compile();

    orderPaymentController = app.get<OrderPaymentController>(OrderPaymentController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(orderPaymentController.getHello()).toBe('Hello World!');
    });
  });
});
