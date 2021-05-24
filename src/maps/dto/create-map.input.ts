import { Field, Int, InputType } from '@nestjs/graphql';

@InputType()
export class CreateMapInput {
  @Field(() => String, { description: 'Title of the song' })
  title: string;

  @Field(() => String, { description: 'Artist name of the song' })
  artist: string;

  @Field(() => Int, { description: 'Song duration in miliseconds' })
  duration: number;

  @Field(() => [Int], {
    description: 'ID of the available difficulties on the map',
  })
  difficulties: number[];
}
