import { Args, Mutation, Query, Resolver, ResolveReference } from "@nestjs/graphql";
import { Wholesaler } from "./entity/wholesaler.entity";
import { WholesalerService } from "./wholesaler.service";
import { WholesalerCreate } from "./dtos/wholesaler-create";
import { WholesalerUpdate } from "./dtos/wholesaler-update";
import { Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";
import { AggregatedFrontline } from "./dtos/frontline-aggregate";
import { FrontlineResponse } from "./dtos/frontline-response";

@Resolver(() => Wholesaler)
export class WholesalerResolver {
  constructor(
    private wholesalerService: WholesalerService,
    @Inject('FRONTLINE_SERVICE') private readonly frontlineClient: ClientProxy,
  ) { }

  @Query(() => Wholesaler)
  async getWholesaler(@Args('id', { type: () => String }) id: string): Promise<Wholesaler | null> {
    return await this.wholesalerService.findOne(id);
  }

  @Query(() => [AggregatedFrontline])
  async getFrontlineByRegion(@Args('regionName', { type: () => String }) regionName: string): Promise<AggregatedFrontline[]> {
    const wholesalers = await this.wholesalerService.findByRegionName(regionName);
    const wholesalerIds = wholesalers.map((w) => w.id);
    const frontlines = await firstValueFrom<FrontlineResponse[]>(this.frontlineClient.send({ cmd: 'findByWholeSalerIds' }, wholesalerIds));

    const aggregated: AggregatedFrontline[] = frontlines.map((frontline) => {
      const wholesaler = wholesalers.find((w) => w.id === frontline.wholesaler);

      if (!wholesaler || !wholesaler.state || !wholesaler.state.region) {
        return;
      }

      return {
        ...frontline,
        wholesaler,
        state: { ...wholesaler.state },
        region: { ...wholesaler.state.region },
      };
    }).filter((item) => item != null);

    return aggregated;
  }

  @Query(() => [Wholesaler])
  async getWholesalersByRegion(@Args('regionName') regionName: string): Promise<Wholesaler[]> {
    return this.wholesalerService.findByRegionName(regionName);
  }

  @Mutation(() => Wholesaler)
  async createWholesaler(@Args('data') data: WholesalerCreate): Promise<Wholesaler> {
    return await this.wholesalerService.create(data);
  }

  @Mutation(() => Wholesaler)
  async updateWholesaler(@Args('data') data: WholesalerUpdate): Promise<Wholesaler | null> {
    return await this.wholesalerService.update(data);
  }

  @ResolveReference()
  async resolveReference(reference: { __typename: string; id: string }): Promise<Wholesaler | null> {
    return await this.wholesalerService.findOne(reference.id);
  }
}

// # Write your query or mutation here
// query {
//   getWholesaler(id: "1") {
//     id
//     url
//     createdAt
//     updatedAt
//     deletedAt
//     __typename
//   }
// }
// 08fea856-b6ea-46e6-86a4-15fca50277d0
//   mutation {
//   createWholesaler(data: {
//     url: "http://example.com",
//     stateName: "California",
//     regionName: "West Coast"
//   }) {
//     id
//     url
//       state {
//       id
//       name
//         region {
//         id
//         name
//       }
//     }
//   }
// }


// mutation {
//   updateWholesaler(data: {
//     id: "123",
//     url: "https://www.google.com.br/search?q=teste",
//   }) {
//     id
//     url
//     createdAt
//     updatedAt
//     deletedAt
//   }
// }
// # Write your query or mutation here