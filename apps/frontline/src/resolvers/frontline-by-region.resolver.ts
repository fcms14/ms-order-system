import { Resolver, ResolveField, Parent } from '@nestjs/graphql';
import { FrontlineByRegion } from '../object-types/frontline-by-region';
import { FrontlineService } from '../frontline.service';
import { Frontline } from '../entity/frontline.entity';

@Resolver(() => FrontlineByRegion)
export class FrontlineByRegionResolver {
  constructor(private readonly frontlineService: FrontlineService) { }

  @ResolveField('frontlines', () => [String])
  async frontlines(@Parent() { wholesalerIds }: FrontlineByRegion): Promise<Frontline[] | null> {
    if (!wholesalerIds) return [];

    const x = await this.frontlineService.findByWholeSalerIds(wholesalerIds);
    console.log(wholesalerIds, x)
    return x
  }
}
