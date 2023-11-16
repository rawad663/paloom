import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { SupabaseClient } from '@supabase/supabase-js';
import { sanitizeInput } from '@/utils/helpers';

import { DatabaseService } from '@/db.service';
import { CreateDocumentInput } from './document.inputs';
import { Document } from './document.schema';

@Injectable()
export class DocumentService {
  private db: SupabaseClient;

  constructor(dbService: DatabaseService) {
    this.db = dbService.getClient();
  }

  async createDocument(input: CreateDocumentInput, userId: string): Promise<Document> {
    const sanitizedInput = sanitizeInput(input);
    const id: string = uuidv4();

    const data = {
      ...sanitizedInput,
      id,
      owner_id: userId,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { error } = await this.db.from('documents').insert(data);

    if (error) throw new Error(error.message);

    return data as Document;
  }

  async getDocuments(userId: string): Promise<Document[]> {
    const { error, data } = await this.db
      .from('documents')
      .select()
      .eq('owner_id', userId);

    if (error) throw new Error(error.message);

    return data as Document[];
  }

  async getDocument(documentId: string, userId: string): Promise<Document> {
    const { error, data } = await this.db
      .from('documents')
      .select()
      .eq('id', documentId)
      .eq('owner_id', userId); //check for ownership

    if (error) throw new Error(error.message);
    if (!data || !data.length) {
      throw new Error(`Cannot find document or you do not have permission to access it`);
    }

    return data[0] as Document;
  }
}
