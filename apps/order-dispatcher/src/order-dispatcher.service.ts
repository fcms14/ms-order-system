import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderDispatcherService {
  getHello(): string {
    return 'Hello World!';
  }
}
