import { CreateDifficultyInput } from './create-difficulty.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateDifficultyInput extends PartialType(CreateDifficultyInput) {
  @Field(() => ID, { description: 'Difficulty unique ID' })
  id: number;

  @Field(() => String, { description: 'Difficulty name' })
  name: string;
}
