import { ObjectType, Field, ID, Int } from '@nestjs/graphql';

@ObjectType()
class UserMetadata {
  @Field(() => String, { nullable: true })
  name?: string;
}

@ObjectType()
class Session {
  @Field()
  access_token: string;

  @Field()
  token_type: string;

  @Field(() => Int)
  expires_in: number;

  @Field(() => Int)
  expires_at: number;

  @Field()
  refresh_token: string;
}

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  aud: string;

  @Field()
  role: string;

  @Field(() => UserMetadata, { nullable: true })
  user_metadata?: UserMetadata;

  @Field()
  created_at: string;

  @Field()
  updated_at: string;

  @Field()
  email: string;
}

@ObjectType()
export class AuthenticatedUser {
  @Field(() => User)
  user: User;

  @Field(() => Session)
  session: Session;
}
