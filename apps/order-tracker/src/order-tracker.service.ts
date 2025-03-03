import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderTrackerService {
  getHello(): string {
    return 'Hello World!';
  }
}
