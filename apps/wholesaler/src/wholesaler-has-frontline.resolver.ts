import { Args, Query, Resolver, ResolveReference } from "@nestjs/graphql";
import { WholesalerService } from "./wholesaler.service";
import { WholesalerHasFrontline } from "./dtos/wholesaler-has-frontline";

@Resolver(() => WholesalerHasFrontline)
export class WholesalerHasFrontlineResolver {
  constructor(
    private wholesalerService: WholesalerService,
  ) { }

  @Query(() => WholesalerHasFrontline)
  async getFrontlineByRegionV2(@Args('regionName', { type: () => String }) regionName: string): Promise<WholesalerHasFrontline> {
    const wholesalers = await this.wholesalerService.findByRegionName(regionName);

    // return { wholesalers_json: JSON.stringify(wholesalers) };
    return { wholesalers_json: wholesalers };
  }

  @Query(() => WholesalerHasFrontline)
  async getFrontlineByState(@Args('stateName', { type: () => String }) stateName: string): Promise<WholesalerHasFrontline> {
    const wholesalers = await this.wholesalerService.findByStateName(stateName);

    // return { wholesalers_json: JSON.stringify(wholesalers) };
    return { wholesalers_json: wholesalers };
  }
}
