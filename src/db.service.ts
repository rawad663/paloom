import { Injectable } from '@nestjs/common';
import { SupabaseClient, createClient } from '@supabase/supabase-js';

const DB_URL = 'https://bnriwwqgquoqqmgypyiv.supabase.co';
// const PUBLIC_ANON_KEY =
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJucml3d3FncXVvcXFtZ3lweWl2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk5OTI3NTUsImV4cCI6MjAxNTU2ODc1NX0.WN3FWb-5ImoUvcsAur-1X3wYHplGrKhRxcmU-YNcbF0';
const SERVICE_ROLE_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJucml3d3FncXVvcXFtZ3lweWl2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5OTk5Mjc1NSwiZXhwIjoyMDE1NTY4NzU1fQ.dnPC6ex8LRquWTijNBN4dXDRMB2EMbwvTa1_gVBklBk';

@Injectable()
export class DatabaseService {
  private readonly client: SupabaseClient;

  constructor() {
    this.client = createClient(DB_URL, SERVICE_ROLE_KEY);
  }

  getClient() {
    return this.client;
  }
}
