import { Args, Mutation, Query, Resolver, ResolveReference, } from "@nestjs/graphql";
import { Frontline } from "./entity/frontline.entity";
import { FrontlineService } from "./frontline.service";
import { FrontlineCreate } from "./dtos/frontline-create";
import { FrontlineUpdate } from "./dtos/frontline-update";

@Resolver(() => Frontline)
export class FrontlineResolver {
  constructor(
    private frontlineService: FrontlineService,
  ) { }

  @Query(() => Frontline)
  async getFrontline(@Args('id', { type: () => String }) id: string): Promise<Frontline | null> {
    return await this.frontlineService.findOne(id);
  }

  @Mutation(() => Frontline)
  async createFrontline(@Args('data') data: FrontlineCreate): Promise<Frontline> {
    return await this.frontlineService.create(data);
  }

  @Mutation(() => Frontline)
  async updateFrontline(@Args('data') data: FrontlineUpdate): Promise<Frontline | null> {
    return await this.frontlineService.update(data);
  }

  @ResolveReference()
  async resolveReference(reference: { __typename: string; id: string }): Promise<Frontline | null> {
    return await this.frontlineService.findOne(reference.id);
  }
}

// # Write your query or mutation here
// query {
//   getFrontline(id: "1") {
//     id
//     name
//     wholesaler
//     packageNumber
//     createdAt
//     updatedAt
//     deletedAt
//     __typename
//   }
// }

// mutation {
//   createFrontline(data: {
//     name: "Laptop",
//     wholesaler: 1,
//     packageNumber: 1,
//   }) {
//     id
//     name
//     wholesaler
//     packageNumber
//     createdAt
//     updatedAt
//     deletedAt
//   }
// }

// mutation {
//   updateFrontline(data: {
//     id: "123",
//     name: "Laptop",
//     wholesaler: 1,
//     packageNumber: 1,
//   }) {
//     id
//     name
//     wholesaler
//     packageNumber
//     createdAt
//     updatedAt
//     deletedAt
//   }
// }
// # Write your query or mutation here