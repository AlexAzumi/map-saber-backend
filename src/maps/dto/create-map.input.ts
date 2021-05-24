import { Field, Int, InputType } from '@nestjs/graphql';
import { Difficulty } from '../../difficulties/entities/difficulty.entity';

@InputType()
export class CreateMapInput {
  @Field(() => String, { description: 'Title of the song' })
  title: string;

  artist: string;

  @Field(() => Int, { description: 'Song duration in miliseconds' })
  duration: number;

  @Field(() => [Int], {
    description: 'Available difficulties on the map',
  })
  difficulties: Difficulty[];
}
