import { ObjectType, Field, ID, GraphQLISODateTime } from '@nestjs/graphql';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
// Entities
import { Map } from '../../maps/entities/map.entity';

@Entity()
@Unique(['username', 'email'])
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('increment')
  @Field(() => ID)
  id: number;

  @Field(() => String, { description: 'Unique username' })
  @Column()
  username: string;

  @Field(() => String, { description: 'Unique email' })
  @Column()
  email: string;

  @Field(() => String, { description: "User's encrypted password" })
  @Column()
  password: string;

  @Field(() => GraphQLISODateTime, { description: 'Date of the user creation' })
  @Column()
  creationDate: Date;

  @Field(() => [Map], { description: 'Maps created by the user' })
  @OneToMany(() => Map, (map) => map.author, { eager: true })
  createdMaps?: Map[];
}