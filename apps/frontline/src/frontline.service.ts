import { Injectable, NotFoundException } from '@nestjs/common';
import { Frontline } from './entity/frontline.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { FrontlineCreate } from './dtos/frontline-create';
import { FrontlineUpdate } from './dtos/frontline-update';

@Injectable()
export class FrontlineService {
  constructor(
    @InjectRepository(Frontline)
    private orderStockRepository: Repository<Frontline>,
  ) { }

  findByWholesalerId(id: string): Promise<Frontline[] | null> {
    return this.orderStockRepository.find({ where: { wholesaler: id }, });
  }

  findByWholeSalerIds(ids: string[]): Promise<Frontline[] | null> {
    return this.orderStockRepository.find({ where: { wholesaler: In(ids) }, });
  }

  findOne(id: string): Promise<Frontline | null> {
    return this.orderStockRepository.findOneBy({ id });
  }

  create(data: FrontlineCreate): Promise<Frontline> {
    return this.orderStockRepository.save(data)
  }

  async update(data: FrontlineUpdate): Promise<Frontline | null> {
    try {
      await this.orderStockRepository.update(data.id, data)
    } catch (error) {
      throw new NotFoundException()
    }

    return await this.orderStockRepository.findOneBy({ id: data.id });
  }
}
