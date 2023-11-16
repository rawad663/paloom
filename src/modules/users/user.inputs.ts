import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => String, { nullable: true })
  name?: string;

  @Field()
  email: string;

  @Field()
  password: string;
}

@InputType()
export class SignInInput {
  @Field()
  email: string;

  @Field()
  password: string;
}
