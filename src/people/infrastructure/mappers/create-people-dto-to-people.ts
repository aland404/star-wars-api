import type { People } from 'src/people/domain/people'
import type { CreatePeopleDto } from '../dtos'

export function createPeopleDtoToPeople(peopleDto: CreatePeopleDto): People {
  return {
    slug: peopleDto.slug,
    kind: peopleDto.kind,
    faction: peopleDto.faction,
    power: peopleDto.power,
  }
}
