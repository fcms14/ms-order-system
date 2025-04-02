import { Field, InputType, PartialType } from '@nestjs/graphql';
import { WholesalerCreate } from './wholesaler-create';

@InputType()
export class WholesalerUpdate extends PartialType(WholesalerCreate) {
  @Field({ nullable: true })
  id: string;
}
