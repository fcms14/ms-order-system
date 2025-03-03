import { Test, TestingModule } from '@nestjs/testing';
import { OrderAllocatorController } from './order-allocator.controller';
import { OrderAllocatorService } from './order-allocator.service';

describe('OrderAllocatorController', () => {
  let orderAllocatorController: OrderAllocatorController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [OrderAllocatorController],
      providers: [OrderAllocatorService],
    }).compile();

    orderAllocatorController = app.get<OrderAllocatorController>(OrderAllocatorController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(orderAllocatorController.getHello()).toBe('Hello World!');
    });
  });
});
