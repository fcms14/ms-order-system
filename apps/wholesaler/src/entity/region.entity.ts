import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany } from 'typeorm';
import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { State } from './state.entity';

@ObjectType()
@Directive('@key(fields: "id")')
@Directive('@tag(name: "region")')
@Entity()
export class Region {
  @Field(type => ID, { nullable: false, description: "Region Id" })
  @Directive('@shareable')
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String, { nullable: false, description: 'Region name' })
  @Directive('@shareable')
  @Column()
  name: string;

  @Field(() => [State], { nullable: true, description: "States belonging to the region" })
  @Directive('@shareable')
  @OneToMany(() => State, (state) => state.region)
  states: State[];

  @Field(type => Date, { nullable: false, description: "Region creation date" })
  @Directive('@shareable')
  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Field(type => Date, { nullable: false, description: "Region updated at" })
  @Directive('@shareable')
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Field(type => Date, { nullable: true, description: "Region deleted at" })
  @Directive('@shareable')
  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt: Date | undefined;
}
