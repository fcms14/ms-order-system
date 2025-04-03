import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from '@nestjs/class-validator'

@InputType()
export class WholesalerCreate {
  @Field()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  url: string;
  
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  stateName: string;
  
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  regionName: string;
}