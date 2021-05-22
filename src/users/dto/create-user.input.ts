import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => String, { description: 'Unique username' })
  username: string;

  @Field(() => String, { description: 'Unique email' })
  email: string;

  @Field(() => String, { description: "User's password" })
  password: string;

  @Field(() => String, { description: "User's repeated password" })
  repeatPassword: string;
}
