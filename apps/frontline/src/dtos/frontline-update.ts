import { Field, InputType, PartialType } from '@nestjs/graphql';
import { FrontlineCreate } from './frontline-create';

@InputType()
export class FrontlineUpdate extends PartialType(FrontlineCreate) {
  @Field({ nullable: true })
  id: string;
}
