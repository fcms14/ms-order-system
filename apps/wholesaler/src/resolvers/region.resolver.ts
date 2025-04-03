import { Args, Resolver, Query } from '@nestjs/graphql';
import { WholesalerService } from '../wholesaler.service';
import { Region } from '../entity/region.entity';


@Resolver(() => Region)
export class RegionResolver {
  constructor(
    private regionService: WholesalerService,
  ) { }

  @Query(() => [Region])
  async findRegionByName(@Args('regionName') regionName: string): Promise<Region[]> {
    return await this.regionService.findRegionByName(regionName);
  }
}
