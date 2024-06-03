import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common'
import type { Request } from 'express'
import { ApiTags } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { AuthGuard } from './auth.guard'
import { SignInDto } from './sign-in.dto'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('/galactic-passport')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.registrationNumber, signInDto.password)
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Req() req: Request) {
    return req.user
  }
}
