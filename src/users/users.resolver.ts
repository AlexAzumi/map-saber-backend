import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UserToken } from './entities/user-token.entity';
import { LoginUserInput } from './dto/login-user.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  signUp(@Args('data') data: CreateUserInput): Promise<UserToken> {
    return this.usersService.create(data);
  }

  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.findOne(id);
  }

  @Mutation(() => User)
  updateUser(@Args('data') data: UpdateUserInput) {
    return this.usersService.update(data.id, data);
  }

  @Mutation(() => User)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.remove(id);
  }

  @Mutation(() => UserToken)
  login(
    @Args('data', { type: () => LoginUserInput }) data: LoginUserInput,
  ): Promise<UserToken> {
    return this.usersService.login(data);
  }
}
