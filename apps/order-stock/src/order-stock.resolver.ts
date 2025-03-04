import { Args, Int, Query, Resolver, ResolveReference } from "@nestjs/graphql";
import { OrderStock } from "./order-stock.model";
import { OrderStockService } from "./order-stock.service";

@Resolver(() => OrderStock)
export class OrdersStockResolver {
  constructor(
    private orderStockService: OrderStockService,
  ) { }

  @Query(() => OrderStock)
  async author(@Args('productId', { type: () => Int }) productId: number): Promise<OrderStock> {
    return await this.orderStockService.find(productId);
  }

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: number }): OrderStock {
    return this.orderStockService.find(reference.id);
  }
}
