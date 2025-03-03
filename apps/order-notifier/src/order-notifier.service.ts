import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderNotifierService {
  getHello(): string {
    return 'Hello World!';
  }
}
