import { ObjectType, Field, Directive } from '@nestjs/graphql';
import { Wholesaler } from '../entity/wholesaler.entity';

@ObjectType('Frontline')
@Directive('@extends')
@Directive('@key(fields: "wholesaler")')
export class Frontline {
  @Field(() => String)
  @Directive('@external')
  wholesaler: string;

  @Field(() => Wholesaler, { nullable: true })
  wholesalerData?: Wholesaler;
}
