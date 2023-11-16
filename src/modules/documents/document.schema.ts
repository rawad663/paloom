import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Document {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  owner_id: string;

  @Field(() => String, { nullable: true })
  title?: string;

  @Field(() => String, { nullable: true })
  content?: string;

  @Field()
  created_at: string;

  @Field(() => String, { nullable: true })
  updated_at?: string;
}
