import { Args, Mutation, Query, Resolver, ResolveReference, } from "@nestjs/graphql";
import { OrderStock } from "./entity/order-stock.entity";
import { OrderStockService } from "./order-stock.service";
import { Post } from "@nestjs/common";
import { OrderStockCreate } from "./dtos/order-stock-create";
import { OrderStockUpdate } from "./dtos/order-stock-update";

@Resolver(() => OrderStock)
export class OrdersStockResolver {
  constructor(
    private orderStockService: OrderStockService,
  ) { }

  @Query(() => OrderStock)
  async orderStock(@Args('id', { type: () => String }) id: string): Promise<OrderStock | null> {
    return await this.orderStockService.findOne(id);
  }

  @Mutation(() => OrderStock)
  async createOrderStock(@Args('data') data: OrderStockCreate): Promise<OrderStock> {
    return await this.orderStockService.create(data);
  }

  @Mutation(() => OrderStock)
  async updateOrderStock(@Args('data') data: OrderStockUpdate): Promise<OrderStock | null> {
    return await this.orderStockService.update(data);
  }

  @ResolveReference()
  async resolveReference(reference: { __typename: string; id: string }): Promise<OrderStock | null> {
    return await this.orderStockService.findOne(reference.id);
  }
}

// # Write your query or mutation here
// query {
//   author(id: "1") {
//     id
//     product
//     quantity
//     created_at
//     updated_at
//     deleted_at
//     __typename
//   }
// }

// mutation {
//   upsertOrderStock(data: {
//     id: "123",
//     product: "Laptop",
//     quantity: 50
//   }) {
//     id
//     product
//     quantity
//     created_at
//     updated_at
//   }
// }
// # Write your query or mutation here