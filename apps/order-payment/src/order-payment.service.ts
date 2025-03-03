import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderPaymentService {
  getHello(): string {
    return 'Hello World!';
  }
}
