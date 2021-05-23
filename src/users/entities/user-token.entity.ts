import { Field, ObjectType } from '@nestjs/graphql';
import { User } from './user.entity';

@ObjectType()
export class UserToken {
  @Field(() => String, { description: 'Authentication JWT' })
  token: string;

  @Field(() => User, { description: "User's profile" })
  user: User;
}
