import { IsNotEmpty, IsNumber, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import type { Faction, Kind } from '../../domain/people'

export class CreatePeopleDto {
  @ApiProperty({ example: 'wookie' })
  @IsString()
  @IsNotEmpty()
  readonly slug: string

  @ApiProperty({ example: 'wookie' })
  @IsString()
  readonly kind: Kind

  @ApiProperty({ example: 'rebellion' })
  @IsString()
  readonly faction: Faction

  @ApiProperty({ example: '42' })
  @IsNumber()
  readonly power: number
}
