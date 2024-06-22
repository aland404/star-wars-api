import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { PostGalacticPassportDTO } from './post-galactic-passport-d-t.o'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({
    summary: `Récupération d'un passeport galactique`,
    description: `Récupération d'un passeport galactique permettant d'appeler les services nécessitant une authentification.`,
  })
  @HttpCode(HttpStatus.CREATED)
  @Post('/galactic-passport')
  getGalacticPassport(@Body() postGalacticPassport: PostGalacticPassportDTO) {
    return this.authService.signIn(postGalacticPassport.registrationNumber, postGalacticPassport.password)
  }

  // @UseGuards(AuthGuard)
  // @Get('profile')
  // getProfile(@Req() req: Request) {
  //   return req.user
  // }
}
