import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderReviewService {
  getHello(): string {
    return 'Hello World!';
  }
}
