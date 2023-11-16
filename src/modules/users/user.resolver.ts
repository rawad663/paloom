import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AuthenticatedUser, User } from './user.schema';
import { CreateUserInput, SignInInput } from './user.inputs';
import { UserService } from './user.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private userService: UserService) {}

  @Mutation(() => User)
  async createUser(@Args('input') input: CreateUserInput): Promise<User> {
    const newUser = await this.userService.createUser(input);

    return newUser;
  }

  @Query(() => AuthenticatedUser)
  async signIn(@Args('input') input: SignInInput): Promise<AuthenticatedUser> {
    const user = await this.userService.signIn(input);

    return user;
  }

  @Query(() => User)
  async getUser(@Args('userId') userId: string): Promise<User> {
    const user = await this.userService.getUser(userId);

    return user;
  }
}
