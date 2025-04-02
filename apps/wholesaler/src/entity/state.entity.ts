import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { Region } from './region.entity';
import { Wholesaler } from './wholesaler.entity';

@ObjectType()
@Directive('@key(fields: "id")')
@Directive('@tag(name: "state")')
@Entity()
export class State {
  @Field(type => ID, { nullable: false, description: "State Id" })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String, { nullable: false, description: 'State name' })
  @Column()
  name: string;

  @ManyToOne(() => Region, (region) => region.states)
  @JoinColumn({ name: 'region_id' })
  @Field(() => Region, { nullable: false, description: "Region this state belongs to" })
  region: Region;

  @OneToMany(() => Wholesaler, (wholesaler) => wholesaler.state)
  @Field(() => [Wholesaler], { nullable: true, description: "Wholesalers in this state" })
  wholesalers: Wholesaler[];

  @Field(type => Date, { nullable: false, description: "State creation date" })
  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Field(type => Date, { nullable: false, description: "State updated at" })
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Field(type => Date, { nullable: true, description: "State deleted at" })
  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt: Date | undefined;
}
