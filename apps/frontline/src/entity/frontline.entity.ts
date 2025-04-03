import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { Directive, Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Directive('@key(fields: "id")')
@Directive('@tag(name: "frontline")')
@Entity()
export class Frontline {
  @Field(type => ID, { nullable: false, description: "Frontline Id" })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String, { nullable: false, description: 'Frontline name' })
  @Column()
  name: string;

  @Field(type => String, { nullable: false, description: "Wholesaler id" })
  @Column({ name: 'wholesaler_id', nullable: true })
  wholesalerId: string;

  @Field(type => Int, { nullable: false, description: "Package number" })
  @Column({ name: 'package_number' })
  packageNumber: number;

  @Field(type => Date, { nullable: false, description: "Frontline creation date" })
  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Field(type => Date, { nullable: false, description: "Frontline updated at" })
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Field(type => Date, { nullable: true, description: "Frontline deleted at" })
  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt: Date | undefined;
}
