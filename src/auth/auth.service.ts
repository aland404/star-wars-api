import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from '../users/users.service'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, password: string): Promise<{ galactic_passport: string }> {
    const user = await this.usersService.findOne(username)
    if (user?.password !== password) {
      throw new UnauthorizedException()
    }
    const payload = { sub: `user:${user.id}:${user.name}`, username: user.name }
    return {
      galactic_passport: await this.jwtService.signAsync(payload),
    }
  }
}
