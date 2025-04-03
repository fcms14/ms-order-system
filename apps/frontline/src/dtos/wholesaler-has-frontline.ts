import { Directive, Field, ID, ObjectType } from "@nestjs/graphql";
import { FrontlineDto } from "./frontline.dto";
import { Wholesaler } from "./wholesaler-extension";

@ObjectType()
@Directive('@extends')
@Directive('@key(fields: "wholesalers_json { id, url, createdAt, updatedAt, deletedAt, state { id, name, region { id, name } } }")')
export class WholesalerHasFrontline {
  @Field(() => [Wholesaler], { nullable: false, description: "Wholesalers JSON" })
  @Directive('@external')
  wholesalers_json: Wholesaler[];

  @Field(() => [FrontlineDto], { nullable: false, description: "Frontline Id" })
  has_frontlines: FrontlineDto[];
}