import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsString } from '@nestjs/class-validator'
import { Type } from '@nestjs/class-transformer';

@InputType()
export class OrderStockCreate {
  @Field()
  @IsNotEmpty()
  @IsString()
  product: string;

  @Type(() => Number)
  @IsInt({ message: "quantity should be an integer number" })
  @Field(() => Int)
  quantity: number;
}