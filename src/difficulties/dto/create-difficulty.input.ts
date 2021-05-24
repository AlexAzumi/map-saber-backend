import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateDifficultyInput {
  @Field(() => String, { description: 'Difficulty name' })
  name: string;
}
