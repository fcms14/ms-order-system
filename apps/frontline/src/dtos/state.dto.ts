import { ObjectType, Field, ID, Directive, Int } from '@nestjs/graphql';
import { Region } from './region.dto';

@ObjectType()
export class State {
  @Field(type => ID, { nullable: false, description: "State Id" })
  @Directive('@shareable')
  id: string;

  @Field(() => String, { nullable: false, description: 'State name' })
  @Directive('@shareable')
  name: string;

  @Field(() => Region, { nullable: false, description: "Region this state belongs to" })
  @Directive('@shareable')
  region: Region;
}
