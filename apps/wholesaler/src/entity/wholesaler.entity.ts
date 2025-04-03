import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { State } from './state.entity';

@ObjectType()
@Directive('@key(fields: "id")')
@Directive('@tag(name: "wholesaler")')
@Entity()
export class Wholesaler {
  @Field(type => ID, { nullable: false, description: "Wholesaler Id" })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String, { nullable: false, description: 'Wholesaler name' })
  @Column()
  name: string;

  @Field(() => String, { nullable: false, description: 'Wholesaler url' })
  @Column()
  url: string;

  @Field(() => State, { nullable: false, description: "State this wholesaler belongs to" })
  @ManyToOne(() => State, (state) => state.wholesalers)
  @JoinColumn({ name: 'state_id' })
  state: State;

  @Field(type => Date, { nullable: false, description: "Wholesaler creation date" })
  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Field(type => Date, { nullable: false, description: "Wholesaler updated at" })
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Field(type => Date, { nullable: true, description: "Wholesaler deleted at" })
  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt: Date | undefined;
}
