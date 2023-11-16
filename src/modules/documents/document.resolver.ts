import {
  Resolver,
  Query,
  Mutation,
  Args,
  Context,
  GqlExecutionContext,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@/guards/auth.guard';

import { CreateDocumentInput } from './document.inputs';
import { DocumentService } from './document.service';

@Resolver(() => Boolean)
@UseGuards(AuthGuard)
export class DocumentsResolver {
  constructor(private documentService: DocumentService) {}

  @Mutation(() => Boolean)
  async createDocument(
    @Args('input') input: CreateDocumentInput,
    @Context() context: any,
  ): Promise<boolean> {
    const userId = context.req.user.id as string;

    const newDocument = await this.documentService.createDocument(
      input,
      userId,
    );

    return true;
  }
}
