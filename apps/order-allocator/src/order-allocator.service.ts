import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderAllocatorService {
  getHello(): string {
    return 'Hello World!';
  }
}
