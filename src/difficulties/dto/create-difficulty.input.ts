import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateDifficultyInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
