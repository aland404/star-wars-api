import { IsNotEmpty, IsNumber, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class PeopleToAddToBattleDTO {
  @ApiProperty({ example: 'wookie' })
  @IsString()
  @IsNotEmpty()
  readonly peopleSlug: string

  @ApiProperty({ example: 5 })
  @IsNumber()
  @IsNotEmpty()
  readonly numberToAdd: number
}
