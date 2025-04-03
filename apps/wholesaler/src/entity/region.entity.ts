import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany } from 'typeorm';
import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { State } from './state.entity';

@ObjectType()
@Directive('@key(fields: "id")')
@Directive('@tag(name: "region")')
@Entity()
export class Region {
  @Field(type => ID, { nullable: false, description: "Region Id" })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String, { nullable: false, description: 'Region name' })
  @Column()
  name: string;

  @Field(() => [State], { nullable: true, description: "States belonging to the region" })
  @OneToMany(() => State, (state) => state.region)
  states: State[];

  @Field(type => Date, { nullable: false, description: "Region creation date" })
  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Field(type => Date, { nullable: false, description: "Region updated at" })
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Field(type => Date, { nullable: true, description: "Region deleted at" })
  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt: Date | undefined;
}
