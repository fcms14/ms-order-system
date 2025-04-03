import { ObjectType, Field, Directive } from '@nestjs/graphql';
import { Wholesaler } from '../entity/wholesaler.entity';
import { State } from '../entity/state.entity';
import { Region } from '../entity/region.entity';

@ObjectType()
@Directive('@extends')
@Directive('@key(fields: "wholesalerId")')
export class Frontline {
  @Field(type => String, { nullable: false, description: "Wholesaler id" })
  @Directive('@external')
  wholesalerId: string;

  @Field(() => Wholesaler, { nullable: true })
  wholesaler?: Wholesaler;

  @Field(() => State, { nullable: true })
  state?: State;

  @Field(() => Region, { nullable: true })
  region?: Region;
}
