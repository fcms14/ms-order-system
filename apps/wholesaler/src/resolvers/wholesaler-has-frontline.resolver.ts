import { Resolver, ResolveField, Parent } from '@nestjs/graphql';
import { Frontline } from '../object-types/wholesaler-has-frontline';
import { WholesalerService } from '../wholesaler.service';
import { Wholesaler } from '../entity/wholesaler.entity';


@Resolver(() => Frontline)
export class WholesalerHasFrontlineResolver {
  constructor(private readonly wholesalerService: WholesalerService) { }

  @ResolveField('wholesaler', () => Wholesaler)
  async frontlines(@Parent() frontline: Frontline): Promise<Wholesaler | null> {
    return this.wholesalerService.findOne(frontline.wholesalerId);
  }
}
