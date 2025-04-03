import { ObjectType, Field, ID, Directive } from '@nestjs/graphql';
import { Wholesaler } from '../entity/wholesaler.entity';


@ObjectType()
@Directive('@extends')
@Directive('@key(fields: "wholesalerId")')
export class Frontline {
  @Field(type => String, { nullable: false, description: "Wholesaler id" })
  @Directive('@external')
  wholesalerId: string;

  @Field(() => Wholesaler, { nullable: true })
  wholesaler?: Wholesaler;
}
