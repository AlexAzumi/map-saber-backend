import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class LoginUserInput {
  @Field(() => String, { description: "User's unique username" })
  username: string;

  @Field(() => String, { description: "User's password" })
  password: string;
}
