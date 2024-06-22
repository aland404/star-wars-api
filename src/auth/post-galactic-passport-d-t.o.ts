import { IsNotEmpty, IsString } from 'class-validator'

export class PostGalacticPassportDTO {
  @IsString()
  @IsNotEmpty()
  readonly registrationNumber: string

  @IsString()
  @IsNotEmpty()
  readonly password: string
}
