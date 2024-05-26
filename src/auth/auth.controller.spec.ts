import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import {AuthService} from "./auth.service";
import {UsersService} from "../users/users.service";
import {UsersModule} from "../users/users.module";
import {JwtModule} from "@nestjs/jwt";

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        UsersModule,
        JwtModule.register({
          global: true,
          secret: 'temporary_secret_to_test',
          signOptions: { expiresIn: '180s' },
        })
      ],
      controllers: [AuthController],
      providers: [AuthService]
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
