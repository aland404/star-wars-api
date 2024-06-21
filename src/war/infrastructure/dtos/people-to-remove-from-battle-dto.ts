import { IsNotEmpty, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class PeopleToRemoveFromBattleDTO {
  @ApiProperty({ example: 'storm_trooper' })
  @IsString()
  @IsNotEmpty()
  readonly peopleSlug: string
}
