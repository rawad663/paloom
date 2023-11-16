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
import { Document } from './document.schema';

@Resolver(() => Document)
@UseGuards(AuthGuard)
export class DocumentsResolver {
  constructor(private documentService: DocumentService) {}

  @Mutation(() => Document)
  async createDocument(
    @Args('input') input: CreateDocumentInput,
    @Context() context: any,
  ): Promise<Document> {
    const userId = context.req.user.id as string;

    const newDocument = await this.documentService.createDocument(
      input,
      userId,
    );

    return newDocument;
  }

  @Query(() => [Document])
  async getDocuments(@Context() context: any): Promise<Document[]> {
    const userId = context.req.user.id as string;

    const documents = await this.documentService.getDocuments(userId);

    return documents;
  }
}
