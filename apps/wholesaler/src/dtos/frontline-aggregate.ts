import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { Wholesaler } from '../entity/wholesaler.entity';
import { State } from '../entity/state.entity';
import { Region } from '../entity/region.entity';


@ObjectType()
export class AggregatedFrontline {
  @Field(type => ID, { nullable: false, description: "Frontline Id" })
  id: string;

  @Field(() => String, { nullable: false, description: 'Frontline name' })
  name: string;

  @Field(type => Int, { nullable: false, description: "Frontline package number" })
  packageNumber: number;

  @Field(type => Wholesaler, { nullable: false, description: "wholesaler this Frontline belongs to" })
  wholesaler: Wholesaler;

  @Field(() => State, { nullable: false, description: "State this Frontline belongs to" })
  state: State;

  @Field(() => Region, { nullable: false, description: "Region this Frontline belongs to" })
  region: Region;

  @Field(type => Date, { nullable: false, description: "Frontline creation date" })
  createdAt: Date;

  @Field(type => Date, { nullable: false, description: "Frontline updated at" })
  updatedAt: Date;

  @Field(type => Date, { nullable: true, description: "Frontline deleted at" })
  deletedAt: Date | undefined;
}