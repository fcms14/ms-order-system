import { Field, ID, Int, ObjectType } from "@nestjs/graphql";
import { State } from "./state.dto";
import { Region } from "./region.dto";
import { Wholesaler } from "./wholesaler-extension";

@ObjectType()
export class FrontlineDto {
  @Field(type => ID, { nullable: false, description: "Frontline Id" })
  id: string;

  @Field(() => String, { nullable: false, description: 'Frontline name' })
  name: string;

  @Field(type => String, { nullable: false, description: "Wholesaler id" })
  wholesalerId: string;

  @Field(type => Wholesaler, { nullable: false, description: "Wholesaler" })
  wholesaler: Wholesaler;

  @Field(() => State, { nullable: false, description: "State this wholesaler belongs to" })
  state: State;

  @Field(() => Region, { nullable: false, description: "Region this state belongs to" })
  region: Region;

  @Field(type => Int, { nullable: false, description: "Package number" })
  packageNumber: number;

  @Field(type => Date, { nullable: false, description: "Product creation date" })
  createdAt: Date;

  @Field(type => Date, { nullable: false, description: "Product updated at" })
  updatedAt: Date;

  @Field(type => Date, { nullable: true, description: "Product deleted at" })
  deletedAt: Date | undefined;
}