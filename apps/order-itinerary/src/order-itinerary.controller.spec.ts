import { Test, TestingModule } from '@nestjs/testing';
import { OrderItineraryController } from './order-itinerary.controller';
import { OrderItineraryService } from './order-itinerary.service';

describe('OrderItineraryController', () => {
  let orderItineraryController: OrderItineraryController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [OrderItineraryController],
      providers: [OrderItineraryService],
    }).compile();

    orderItineraryController = app.get<OrderItineraryController>(OrderItineraryController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(orderItineraryController.getHello()).toBe('Hello World!');
    });
  });
});
