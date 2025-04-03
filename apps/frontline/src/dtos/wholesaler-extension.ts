import { ObjectType, Field, ID, Directive } from '@nestjs/graphql';
import { Frontline } from '../entity/frontline.entity';
import { State } from './state.dto';

@ObjectType()
@Directive('@extends')
@Directive('@key(fields: "id")')
export class Wholesaler {
  @Field(() => ID)
  @Directive('@external')
  id: string;

  @Field(() => [Frontline], { nullable: true })
  frontlines?: Frontline[];

  @Field(() => String, { nullable: false, description: 'Wholesaler url' })
  @Directive('@shareable')
  url: string;

  @Field(() => State, { nullable: false, description: "State this wholesaler belongs to" })
  @Directive('@shareable')
  state: State;

  @Field(type => Date, { nullable: false, description: "Wholesaler creation date" })
  @Directive('@shareable')
  createdAt: Date;

  @Field(type => Date, { nullable: false, description: "Wholesaler updated at" })
  @Directive('@shareable')
  updatedAt: Date;

  @Field(type => Date, { nullable: true, description: "Wholesaler deleted at" })
  @Directive('@shareable')
  deletedAt: Date | undefined;
}
