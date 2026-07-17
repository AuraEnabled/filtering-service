import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom, Observable } from 'rxjs';
import { USERS_PACKAGE } from './constants';

export interface User {
  id: number;
  name: string;
  age: number;
}

export interface UserList {
  users: User[];
}

interface UserServiceClient {
  getFilteredUsers(request: Record<string, never>): Observable<UserList>;
}

@Injectable()
export class UserClientService implements OnModuleInit {
  private userService: UserServiceClient;

  constructor(@Inject(USERS_PACKAGE) private readonly client: ClientGrpc) {}

  onModuleInit(): void {
    this.userService =
      this.client.getService<UserServiceClient>('UserService');
  }

  async fetchAndLogFilteredUsers(): Promise<void> {
    const { users } = await firstValueFrom(
      this.userService.getFilteredUsers({}),
    );
    console.log('Filtered Users:', JSON.stringify(users ?? [], null, 2));
  }
}
