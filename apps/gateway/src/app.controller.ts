import { Controller, Get, Inject, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';

@Controller('fraight')
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('ORDER_FRAIGHT_SERVICE') private readonly orderFraightClient: ClientProxy,
    // @Inject('ORDER_STOCK_SERVICE') private readonly orderStockClient: ClientProxy,
  ) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @Get('/stock/:productId')
  // async getStock(@Param('productId') productId: number) {
  //   const result = await firstValueFrom(
  //     this.orderStockClient.send({ cmd: 'get-stock' }, productId),
  //   );

  //   return { result };
  // }

  @Get('sum')
  async getSum(@Query('numbers') numbers: string) {
    const parsedNumbers = numbers.split(',').map(Number); // Converte "1,2,3" em [1,2,3]

    const result = await firstValueFrom(
      this.orderFraightClient.send({ cmd: 'sum' }, parsedNumbers),
    );

    return { result };
  }
}
