import { Directive, Field, ObjectType } from "@nestjs/graphql";
import { Frontline } from "../entity/frontline.entity";

@ObjectType()
@Directive('@extends')
@Directive('@key(fields: "wholesalerIds")')
export class FrontlineByRegion {
  @Field(() => [String], { nullable: false, description: "Wholesalers ids" })
  wholesalerIds: string[];

  @Field(() => [Frontline], { nullable: true })
  frontlines?: Frontline[];
}