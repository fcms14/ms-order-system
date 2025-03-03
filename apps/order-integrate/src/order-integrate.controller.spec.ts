import { Test, TestingModule } from '@nestjs/testing';
import { OrderIntegrateController } from './order-integrate.controller';
import { OrderIntegrateService } from './order-integrate.service';

describe('OrderIntegrateController', () => {
  let orderIntegrateController: OrderIntegrateController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [OrderIntegrateController],
      providers: [OrderIntegrateService],
    }).compile();

    orderIntegrateController = app.get<OrderIntegrateController>(OrderIntegrateController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(orderIntegrateController.getHello()).toBe('Hello World!');
    });
  });
});
