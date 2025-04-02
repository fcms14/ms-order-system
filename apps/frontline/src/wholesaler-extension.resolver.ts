import { Resolver, ResolveField, Parent } from '@nestjs/graphql';
import { Wholesaler } from './dtos/wholesaler-extension';
import { Frontline } from './entity/frontline.entity';
import { FrontlineService } from './frontline.service';

@Resolver(() => Wholesaler)
export class WholesalerExtensionResolver {
  constructor(private readonly frontlineService: FrontlineService) { }

  @ResolveField('frontlines', () => [Frontline])
  async frontlines(@Parent() wholesaler: Wholesaler): Promise<Frontline[] | null> {
    return this.frontlineService.findByWholesalerId(wholesaler.id);
  }
}
