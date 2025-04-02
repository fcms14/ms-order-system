import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { FrontlineService } from './frontline.service';
import { Frontline } from './entity/frontline.entity';

@Controller()
export class FrontlineController {
  private readonly logger = new Logger(FrontlineController.name);

  constructor(
    private frontlineService: FrontlineService,
  ) { }

  @MessagePattern({ cmd: 'findByWholeSalerIds' })
  async findByWholeSalerIds(ids: string[]): Promise<Frontline[] | null> {
    return await this.frontlineService.findByWholeSalerIds(ids);
  }
}
