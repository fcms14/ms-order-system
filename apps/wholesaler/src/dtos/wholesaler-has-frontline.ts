import { Directive, Field, ID, ObjectType } from "@nestjs/graphql";
import { Wholesaler } from "../entity/wholesaler.entity";

@ObjectType()
@Directive('@key(fields: "wholesalers_json { id, url, createdAt, updatedAt, deletedAt, state { id, name, region { id, name } } }")')
export class WholesalerHasFrontline {
  @Field(() => [Wholesaler], { nullable: false, description: "Wholesalers by region" })
  wholesalers_json: Wholesaler[];
}