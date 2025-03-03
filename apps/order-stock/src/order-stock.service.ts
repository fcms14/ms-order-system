import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderStockService {
  getHello(): string {
    return 'Hello World!';
  }
}
