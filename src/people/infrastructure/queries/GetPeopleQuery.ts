import { IsEnum, IsOptional } from 'class-validator'
import { Faction } from '../../domain/people'

export class GetPeopleQuery {
  @IsEnum(Faction)
  @IsOptional()
    faction?: Faction
}
