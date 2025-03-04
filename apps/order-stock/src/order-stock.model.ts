import { Directive, Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Directive('@key(fields: "productId")')
@Directive('@tag(name: "stock")')
export class OrderStock {
  @Field(type => ID, { nullable: false, description: "Product Id" })
  productId: number;

  @Field(type => Int, { nullable: false, description: "Stock availability" })
  available: number;
}
