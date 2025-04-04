import { Injectable, NotFoundException } from '@nestjs/common';
import { Wholesaler } from './entity/wholesaler.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { WholesalerCreate } from './dtos/wholesaler-create';
import { WholesalerUpdate } from './dtos/wholesaler-update';
import { State } from './entity/state.entity';
import { Region } from './entity/region.entity';

@Injectable()
export class WholesalerService {
  constructor(
    @InjectRepository(Wholesaler) private wholesalerRepository: Repository<Wholesaler>,
    @InjectRepository(State) private stateRepository: Repository<State>,
    @InjectRepository(Region) private regionRepository: Repository<Region>,
  ) { }

  find(): Promise<Wholesaler[] | null> {
    return this.wholesalerRepository.find({
      relations: ['state', 'state.region'],
      relationLoadStrategy: 'join',
    });
  }

  findOne(id: string): Promise<Wholesaler | null> {
    return this.wholesalerRepository.findOne({
      where: { id },
      relations: ['state', 'state.region'],
      relationLoadStrategy: 'join',
    });
  }

  findByStateName(stateName: string): Promise<Wholesaler[]> {
    return this.wholesalerRepository.find({
      where: { state: { name: Like(`%${stateName}%`) } },
      relations: ['state', 'state.region'],
      relationLoadStrategy: 'join',
    });
  }

  findByRegionName(regionName: string): Promise<Wholesaler[]> {
    return this.wholesalerRepository.find({
      where: { state: { region: { name: Like(`%${regionName}%`) } } },
      relations: ['state', 'state.region'],
      relationLoadStrategy: 'join',
    });
  }

  findRegionByName(name: string): Promise<Region[]> {
    return this.regionRepository.find({
      where: { name: Like(`%${name}%`) },
      relations: ['states', 'states.wholesalers'],
      relationLoadStrategy: 'join',
    });
  }

  async create(createWholesalerDto: WholesalerCreate): Promise<Wholesaler> {
    const { name, url, stateName, regionName } = createWholesalerDto;

    let region = await this.regionRepository.findOne({ where: { name: regionName } });

    if (!region) {
      region = this.regionRepository.create({ name: regionName });
      await this.regionRepository.save(region);
    }

    let state = await this.stateRepository.findOne({
      where: { name: stateName, region: { id: region.id } },
      relations: ['region'],
      relationLoadStrategy: 'join',
    });

    if (!state) {
      state = this.stateRepository.create({ name: stateName, region });
      await this.stateRepository.save(state);
    }

    const wholesaler = this.wholesalerRepository.create({ name, url, state });
    await this.wholesalerRepository.save(wholesaler);

    return wholesaler;
  }

  async update(data: WholesalerUpdate): Promise<Wholesaler | null> {
    try {
      await this.wholesalerRepository.update(data.id, data)
    } catch (error) {
      throw new NotFoundException()
    }

    return await this.wholesalerRepository.findOneBy({ id: data.id });
  }
}
