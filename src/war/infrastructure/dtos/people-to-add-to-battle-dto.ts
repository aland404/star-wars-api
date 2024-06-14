import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class PeopleToAddToBattleDTO {
  @IsString()
  @IsNotEmpty()
  readonly peopleSlug: string

  @IsNumber()
  @IsNotEmpty()
  readonly numberToAdd: number
}
