import { Field, InputType, PartialType } from '@nestjs/graphql';
import { OrderStockCreate } from './order-stock-create';

@InputType()
export class OrderStockUpdate extends PartialType(OrderStockCreate) {
  @Field({ nullable: true })
  id: string;
}
