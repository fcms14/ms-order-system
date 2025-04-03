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
  @Directive('@shareable')
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String, { nullable: false, description: 'State name' })
  @Directive('@shareable')
  @Column()
  name: string;

  @Field(() => Region, { nullable: false, description: "Region this state belongs to" })
  @Directive('@shareable')
  @ManyToOne(() => Region, (region) => region.states)
  @JoinColumn({ name: 'region_id' })
  region: Region;

  @Field(() => [Wholesaler], { nullable: true, description: "Wholesalers in this state" })
  @Directive('@shareable')
  @OneToMany(() => Wholesaler, (wholesaler) => wholesaler.state)
  wholesalers: Wholesaler[];

  @Field(type => Date, { nullable: false, description: "State creation date" })
  @Directive('@shareable')
  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Field(type => Date, { nullable: false, description: "State updated at" })
  @Directive('@shareable')
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Field(type => Date, { nullable: true, description: "State deleted at" })
  @Directive('@shareable')
  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt: Date | undefined;
}
