
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { Directive, Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Directive('@key(fields: "id")')
@Directive('@tag(name: "stock")')
@Entity()
export class OrderStock {
  @Field(type => ID, { nullable: false, description: "Product Id" })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String, { nullable: false, description: 'Product name' })
  @Column()
  product: string;

  @Field(type => Int, { nullable: false, description: "Stock availability" })
  @Column()
  quantity: number;

  @Field(type => Date, { nullable: false, description: "Product creation date" })
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Field(type => Date, { nullable: false, description: "Product updated at" })
  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @Field(type => Date, { nullable: true, description: "Product deleted at" })
  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deleted_at: Date | undefined;
}
