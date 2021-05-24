import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Map } from '../../maps/entities/map.entity';

@Entity('difficulties')
@ObjectType()
export class Difficulty {
  @Field(() => ID, { description: 'Difficulty unique ID' })
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Field(() => String, { description: 'Difficulty name' })
  @Column()
  name: string;

  @Field(() => [Map], {
    description: 'Maps that has this difficulty in their chart set',
  })
  @ManyToMany(() => Map, (map) => map.difficulties)
  maps?: Map[];
}
