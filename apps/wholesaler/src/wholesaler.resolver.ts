import { Args, Mutation, Query, Resolver, ResolveReference } from "@nestjs/graphql";
import { Wholesaler } from "./entity/wholesaler.entity";
import { WholesalerService } from "./wholesaler.service";
import { WholesalerCreate } from "./dtos/wholesaler-create";
import { WholesalerUpdate } from "./dtos/wholesaler-update";

@Resolver(() => Wholesaler)
export class WholesalerResolver {
  constructor(
    private wholesalerService: WholesalerService,
  ) { }

  @Query(() => [Wholesaler])
  async getWholesales(): Promise<Wholesaler[] | null> {
    return await this.wholesalerService.find();
  }

  @Query(() => Wholesaler)
  async getWholesaler(@Args('id', { type: () => String }) id: string): Promise<Wholesaler | null> {
    return await this.wholesalerService.findOne(id);
  }

  @Query(() => [Wholesaler])
  async getWholesalersByState(@Args('stateName') stateName: string): Promise<Wholesaler[]> {
    return this.wholesalerService.findByStateName(stateName);
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

// mutation {
//   createWholesaler(data: {
//     name: "Any dumb test 3",
//     url: "http://33asdas.com",
//     stateName: "Washington",
//     regionName: "North"
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