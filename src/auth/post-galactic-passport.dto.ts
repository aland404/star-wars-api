import { IsNotEmpty, IsString } from 'class-validator'

export class PostGalacticPassportDto {
  @IsString()
  @IsNotEmpty()
  readonly registrationNumber: string

  @IsString()
  @IsNotEmpty()
  readonly password: string
}
