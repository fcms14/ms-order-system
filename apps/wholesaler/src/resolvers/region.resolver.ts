import { Args, Resolver, Query, ResolveField, Parent } from '@nestjs/graphql';
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

  @ResolveField('wholesalerIds', () => [String])
  wholesalerIds(@Parent() region: Region): string[] {
    if (!region.states) return [];

    const wholesalerIds = region.states.reduce((acc, state) => {
      if (state.wholesalers && Array.isArray(state.wholesalers)) {
        state.wholesalers.forEach(wholesaler => {
          acc.push(wholesaler.id);
        });
      }
      return acc;
    }, [] as string[]);

    return wholesalerIds;
  }
}
