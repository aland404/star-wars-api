import type { TestingModule } from '@nestjs/testing'
import { Test } from '@nestjs/testing'
import { JwtModule } from '@nestjs/jwt'
import { UsersModule } from '../users/users.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

describe('authController', () => {
  let controller: AuthController

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

    controller = module.get<AuthController>(AuthController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
