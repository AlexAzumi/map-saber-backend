import { CreateDifficultyInput } from './create-difficulty.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateDifficultyInput extends PartialType(CreateDifficultyInput) {
  @Field(() => Int)
  id: number;
}
