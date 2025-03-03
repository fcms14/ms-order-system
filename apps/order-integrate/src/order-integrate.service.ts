import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderIntegrateService {
  getHello(): string {
    return 'Hello World!';
  }
}
