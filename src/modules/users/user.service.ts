import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';

import { AuthenticatedUser, User } from './user.schema';
import { DatabaseService } from '@/db.service';
import { CreateUserInput, SignInInput } from './user.inputs';

@Injectable()
export class UserService {
  private db: SupabaseClient;

  constructor(dbService: DatabaseService) {
    this.db = dbService.getClient();
  }

  async createUser({ name, email, password }: CreateUserInput): Promise<User> {
    const { error, data } = await this.db.auth.signUp({
      email,
      password,
      options: {
        data: { name },
      },
    });

    if (error) throw new Error(error.message);

    return data.user as User;
  }

  async signIn(input: SignInInput): Promise<AuthenticatedUser> {
    const { error, data } = await this.db.auth.signInWithPassword(input);

    if (error) throw new Error(error.message);

    return data as any as AuthenticatedUser;
  }

  async getUser(userId: string): Promise<User> {
    const { data, error } = await this.db.auth.admin.getUserById(userId);

    if (error) throw new Error(error.message);

    return data.user as any as User;
  }
}
