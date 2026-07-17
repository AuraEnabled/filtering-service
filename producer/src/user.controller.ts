import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { readFileSync } from 'fs';
import { join } from 'path';

export interface User {
  id: number;
  name: string;
  age: number;
}

export interface UserList {
  users: User[];
}

const ADULT_AGE = 18;

@Controller()
export class UserController {
  @GrpcMethod('UserService', 'GetFilteredUsers')
  getFilteredUsers(): UserList {
    const raw = readFileSync(join(__dirname, 'data/users.json'), 'utf-8');
    const users = JSON.parse(raw) as User[];
    return { users: users.filter((user) => user.age > ADULT_AGE) };
  }
}
