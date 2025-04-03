import { Resolver, ResolveField, Parent } from '@nestjs/graphql';
import { Frontline } from '../object-types/wholesaler-has-frontline';
import { WholesalerService } from '../wholesaler.service';
import { Wholesaler } from '../entity/wholesaler.entity';
import { State } from '../entity/state.entity';
import { Region } from '../entity/region.entity';

@Resolver(() => Frontline)
export class WholesalerHasFrontlineResolver {
  constructor(private readonly wholesalerService: WholesalerService) { }

  @ResolveField('wholesaler', () => Wholesaler)
  async wholesaler(@Parent() frontline: Frontline): Promise<Wholesaler | null> {
    return await this.wholesalerService.findOne(frontline.wholesalerId);
  }

  @ResolveField('state', () => State)
  async state(@Parent() frontline: Frontline): Promise<State | null | undefined> {
    return (await this.wholesalerService.findOne(frontline.wholesalerId))?.state;
  }

  @ResolveField('region', () => Region)
  async region(@Parent() frontline: Frontline): Promise<Region | null | undefined> {
    return (await this.wholesalerService.findOne(frontline.wholesalerId))?.state.region;
  }
}
