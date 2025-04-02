import { ObjectType, Field, ID, Directive } from '@nestjs/graphql';
import { Frontline } from '../entity/frontline.entity';

@ObjectType()
@Directive('@extends')
@Directive('@key(fields: "id")')
export class Wholesaler {
  @Field(() => ID)
  @Directive('@external')
  id: string;

  @Field(() => [Frontline], { nullable: true })
  frontlines?: Frontline[];
}
