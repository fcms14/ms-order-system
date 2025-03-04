import { Injectable } from '@nestjs/common';
import { OrderStock } from './order-stock.model';

@Injectable()
export class OrderStockService {
  find(id: number): OrderStock {
    return {
      productId: id,
      available: 10
    };
  }
}
