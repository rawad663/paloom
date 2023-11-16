import { DatabaseService } from '@/db.service';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class AuthGuard implements CanActivate {
  private client: SupabaseClient;

  constructor(dbService: DatabaseService) {
    this.client = dbService.getClient();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;

    const authHeader = request.headers.authorization;

    if (!authHeader) return false;

    try {
      const token = authHeader.split(' ')[1]; // Assuming 'Bearer TOKEN'
      const { data, error } = await this.client.auth.getUser(token);

      if (error) throw new Error(error.message);
      if (!data) return false;

      // Optionally, add user information to the request object
      request.user = data.user;

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
