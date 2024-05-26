import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import {UsersModule} from "../users/users.module";
import {JwtModule} from "@nestjs/jwt";
import {AuthController} from "./auth.controller";

describe('AuthService', () => {
  let service: AuthService;

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

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
