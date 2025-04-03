import { Args, Resolver, Query } from '@nestjs/graphql';
import { WholesalerService } from '../wholesaler.service';
import { FrontlineByRegion } from '../object-types/frontline-by-region';

@Resolver(() => FrontlineByRegion)
export class FrontlineByRegionResolver {
  constructor(private regionService: WholesalerService) { }

  @Query(() => FrontlineByRegion)
  async getFrontlinesByWholesalersRegion(@Args('regionName') regionName: string): Promise<FrontlineByRegion> {
    const regions = await this.regionService.findRegionByName(regionName);

    return {
      wholesalerIds: Array.from(
        new Set(
          regions.flatMap(
            ({ states }) => states.flatMap(
              ({ wholesalers }) => wholesalers.map(
                ({ id }) => id)
            )
          )
        )
      )
    }
  }
}
