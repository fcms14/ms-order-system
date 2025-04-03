import { Resolver, ResolveField, Parent } from '@nestjs/graphql';
import { Wholesaler } from '../object-types/frontline-belongs-to-wholesaler';
import { FrontlineService } from '../frontline.service';
import { Frontline } from '../entity/frontline.entity';

@Resolver(() => Wholesaler)
export class FrontlineBelongsToWholesalerResolver {
  constructor(private readonly frontlineService: FrontlineService) { }

  @ResolveField('frontlines', () => [Frontline])
  async frontlines(@Parent() wholesaler: Wholesaler): Promise<Frontline[] | null> {
    return this.frontlineService.findByWholesalerId(wholesaler.id);
  }
}
