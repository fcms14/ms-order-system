import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderPrinterService {
  getHello(): string {
    return 'Hello World!';
  }
}
