import { Resolver, ResolveField, Parent } from '@nestjs/graphql';
import { Wholesaler } from './entity/wholesaler.entity';
import { WholesalerService } from './wholesaler.service';
import { Frontline } from './dtos/frontline-extension';

@Resolver(() => Frontline)
export class FrontlineExtensionResolver {
  constructor(private readonly wholesalerService: WholesalerService) { }

  @ResolveField('wholesalerData', () => Wholesaler)
  async resolveWholesalerData(@Parent() frontline: Frontline): Promise<Wholesaler | null> {
    return await this.wholesalerService.findOne(frontline.wholesaler);
  }
}
