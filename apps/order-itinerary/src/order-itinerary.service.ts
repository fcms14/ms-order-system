import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderItineraryService {
  getHello(): string {
    return 'Hello World!';
  }
}
