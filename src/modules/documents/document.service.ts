import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { sanitizeInput } from '@/utils/helpers';

import { DatabaseService } from '@/db.service';
import { CreateDocumentInput } from './document.inputs';

@Injectable()
export class DocumentService {
  private db: SupabaseClient;

  constructor(dbService: DatabaseService) {
    this.db = dbService.getClient();
  }

  async createDocument(
    input: CreateDocumentInput,
    userId: string,
  ): Promise<boolean> {
    const sanitizedInput = sanitizeInput(input);

    const { error } = await this.db.from('documents').insert({
      ...sanitizedInput,
      owner_id: userId,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });

    if (error) throw new Error(error.message);

    return true;
  }
}
