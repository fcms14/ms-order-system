import { ObjectType, Field, ID, Directive } from '@nestjs/graphql';

@ObjectType()
export class Region {
  @Field(type => ID, { nullable: false, description: "Region Id" })
  @Directive('@shareable')
  id: string;

  @Field(() => String, { nullable: false, description: 'Region name' })
  @Directive('@shareable')
  name: string;
}