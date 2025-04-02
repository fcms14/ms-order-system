import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsString } from '@nestjs/class-validator'
import { Type } from '@nestjs/class-transformer';

@InputType()
export class FrontlineCreate {
  @Field()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  wholesaler: string;

  @Type(() => Number)
  @IsInt({ message: "packageNumber should be an integer number" })
  @Field(() => Int)
  packageNumber: number;
}