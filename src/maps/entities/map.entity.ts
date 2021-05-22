import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
// Enums
import { Difficulty } from '../../enums/difficulty.enum';
// Entities
import { User } from '../../users/entities/user.entity';

@Entity('maps')
@ObjectType()
export class Map {
  @PrimaryColumn()
  @Field(() => ID)
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
  @Column()
  likes: number;

  @Field(() => [Difficulty], {
    description: 'Available difficulties on the map',
  })
  @Column({ type: 'varchar' })
  difficulties: Difficulty[];

  @Field(() => User, { description: 'Creator of the map' })
  @ManyToOne(() => User, (user) => user.createdMaps)
  author: User;
}
