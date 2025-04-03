import { Directive, Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
@Directive('@key(fields: "wholesalerIds")')
export class FrontlineByRegion {
  @Field(() => [String], { nullable: false, description: "Wholesalers ids" })
  wholesalerIds: string[];
}