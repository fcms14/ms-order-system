import { Resolver, ResolveField, Parent } from '@nestjs/graphql';
import { WholesalerHasFrontline } from './dtos/wholesaler-has-frontline';
import { FrontlineService } from './frontline.service';
import { FrontlineDto } from './dtos/frontline.dto';

@Resolver(() => WholesalerHasFrontline)
export class WholesalerHasFrontlineResolver {
  constructor(private frontlineService: FrontlineService) { }

  @ResolveField('has_frontlines', () => [FrontlineDto], { nullable: true })
  async resolveFrontlineId(@Parent() wholesalerHasFrontline: WholesalerHasFrontline): Promise<FrontlineDto[] | undefined | null> {
    const wholesalers = wholesalerHasFrontline.wholesalers_json;
    const wholesaler_ids = wholesalers.map((w) => w.id);

    const frontlines = await this.frontlineService.findByWholeSalerIds(wholesaler_ids)

    if (!frontlines) {
      return null
    }

    const aggregated: FrontlineDto[] = frontlines.map((frontline) => {
      const wholesaler = wholesalers.find((w) => w.id === frontline.wholesaler);

      if (!wholesaler || !wholesaler.state || !wholesaler.state.region) {
        return;
      }

      return {
        ...frontline,
        wholesaler: wholesaler,
        wholesalerId: wholesaler.id,
        state: { ...wholesaler.state },
        region: { ...wholesaler.state.region },
      };
    }).filter((item) => item != null);

    console.log(aggregated);

    return aggregated;
  }
}