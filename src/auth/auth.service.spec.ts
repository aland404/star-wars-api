import type { TestingModule } from '@nestjs/testing'
import { Test } from '@nestjs/testing'
import { JwtModule } from '@nestjs/jwt'
import { UsersModule } from '../users/users.module'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'

describe('authService', () => {
  let service: AuthService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        UsersModule,
        JwtModule.register({
          global: true,
          secret: 'temporary_secret_to_test',
          signOptions: { expiresIn: '180s' },
        }),
      ],
      controllers: [AuthController],
      providers: [AuthService],
    }).compile()

    service = module.get<AuthService>(AuthService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
