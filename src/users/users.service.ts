import { Injectable } from '@nestjs/common'
import { users } from './users'
import type { User } from './user'

@Injectable()
export class UsersService {
  async findOne(name: string): Promise<User | undefined> {
    return users.find(user => user.name === name)
  }
}
