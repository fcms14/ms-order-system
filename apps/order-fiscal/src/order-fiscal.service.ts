import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderFiscalService {
  getHello(): string {
    return 'Hello World!';
  }
}
