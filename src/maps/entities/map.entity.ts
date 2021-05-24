import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
// Enums
import { MapStatus } from '../../enums/map-status.enum';
// Entities
import { User } from '../../users/entities/user.entity';
import { Difficulty } from '../../difficulties/entities/difficulty.entity';

@Entity('maps')
@ObjectType()
export class Map {
  @PrimaryGeneratedColumn('increment')
  @Field(() => ID, { description: 'Map unique identifier' })
  id: number;

  @Field(() => String, { description: 'Title of the song' })
  @Column()
  title: string;

  @Field(() => String, { description: 'Artist name of the song' })
  @Column()
  artist: string;

  @Field(() => Int, { description: 'Song duration in miliseconds' })
  @Column()
  duration: number;

  @Field(() => Int, { description: 'Amount of likes given by the users' })
  @Column({ default: 0 })
  likes: number;

  @Field(() => [Difficulty], {
    description: 'Available difficulties for the map',
  })
  @ManyToMany(() => Difficulty, (difficulty) => difficulty.maps, {
    eager: true,
  })
  @JoinTable()
  difficulties: Difficulty[];

  @Field(() => User, { description: 'Creator of the map' })
  @ManyToOne(() => User, (user) => user.createdMaps, { eager: true })
  author: User | number;

  @Field(() => MapStatus, {
    description: 'Map status: RANKED, QUALIFIED or UNRANKED',
  })
  @Column({ type: 'smallint' })
  status: MapStatus;
}
