import { IsNotEmpty, IsString } from 'class-validator'

export class SignInDto {
  @IsString()
  @IsNotEmpty()
  readonly registrationNumber: string

  @IsString()
  @IsNotEmpty()
  readonly password: string
}
