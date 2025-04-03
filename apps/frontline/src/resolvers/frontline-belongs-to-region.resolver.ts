import { Resolver, ResolveField, Parent } from '@nestjs/graphql';
import { Region } from '../object-types/frontline-belongs-to-region';
import { FrontlineService } from '../frontline.service';

@Resolver(() => Region)
export class FrontlineBelongsToRegionResolver {
  constructor(private readonly frontlineService: FrontlineService) { }

  @ResolveField('allFrontlineNames', () => [String])
  allFrontlineNames(@Parent() region: Region[]): string[] {
    // if (!region.states) return [];
    console.log(region)

    // Para cada estado, percorre os wholesalers e depois os frontlines para extrair os nomes
    const frontlineNames = [1,2,3,4].reduce((acc, state) => {
      // if (state.wholesalers && Array.isArray(state.wholesalers)) {
      //   state.wholesalers.forEach(region => {
      //     if (region.frontlines && Array.isArray(region.frontlines)) {
      //       region.frontlines.forEach(frontline => {
      //         if (frontline.name) {
      acc.push("frontline.name");
      //         }
      //       });
      //     }
      //   });
      // }
      return acc;
    }, [] as string[]);


    return frontlineNames;
  }
}
