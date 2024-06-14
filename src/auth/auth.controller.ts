import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { PostGalacticPassportDto } from './post-galactic-passport.dto'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('/galactic-passport')
  getGalacticPassport(@Body() postGalacticPassport: PostGalacticPassportDto) {
    return this.authService.signIn(postGalacticPassport.registrationNumber, postGalacticPassport.password)
  }

  // @UseGuards(AuthGuard)
  // @Get('profile')
  // getProfile(@Req() req: Request) {
  //   return req.user
  // }
}
