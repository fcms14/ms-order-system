import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderFraightService {
  getHello(): string {
    return 'Hello World!';
  }
}
