import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import type { Faction } from '../domain/people'
import type { PeopleRepository } from '../domain/peopleRepository.interface'
import { getPowerForLevelUp } from '../domain/get-power-for-level-up'
import { canBeLeveledUp } from '../domain/can-be-leveled-up'
import { CreatePeopleDto, UpdatePeopleDto } from './dtos'
import { createPeopleDtoToPeople } from './mappers'
import { people } from './people'
import type { PeopleEntity } from './entities'

@Injectable()
export class InMemoryPeopleRepository implements PeopleRepository {
  getPeople(faction?: Faction): PeopleEntity[] {
    if (faction) {
      return people.filter(currentPeople => currentPeople.faction === faction)
    }

    return people
  }

  deleteAPeopleBySug(peopleSlug: string): string {
    const peopleIndex = people.findIndex((people) => {
      return people.slug === peopleSlug
    })
    if (peopleIndex < 0)
      return 'No corresponding people found'

    people.splice(peopleIndex, 1)
    return `People with slug ${peopleSlug} has been deleted`
  }

  getAPeopleBySlug(slug: string): PeopleEntity | undefined {
    return people.find(people => people.slug === slug)
  }

  updateAPeople(peopleSlug: string, peopleToUpdate: UpdatePeopleDto): PeopleEntity {
    const peopleToUpdateIndex = people.findIndex(people => people.slug === peopleSlug)
    if (peopleToUpdateIndex < 0)
      throw new HttpException('No corresponding people found', HttpStatus.NOT_FOUND)

    people[peopleToUpdateIndex] = { ...people[peopleToUpdateIndex], ...peopleToUpdate }

    return people[peopleToUpdateIndex]
  }

  createAPeople(peopleToCreate: CreatePeopleDto): PeopleEntity {
    const peopleToUpdateIndex = people.findIndex(people => people.slug === peopleToCreate.slug)
    if (peopleToUpdateIndex >= 0)
      throw new HttpException('Slug already existing', HttpStatus.CONFLICT)

    const peopleToAdd: PeopleEntity = createPeopleDtoToPeople(peopleToCreate)
    people.push(peopleToAdd)

    return peopleToAdd
  }

  levelUpAPeople(peopleSlug: string): PeopleEntity {
    const peopleToUpdateIndex = people.findIndex(people => people.slug === peopleSlug)
    if (peopleToUpdateIndex < 0)
      throw new HttpException('No corresponding people found', HttpStatus.NOT_FOUND)

    // TODO: to move in use case
    if (!canBeLeveledUp(people[peopleToUpdateIndex]))
      throw new HttpException(`${people[peopleToUpdateIndex].kind} has already reached its maximum`, HttpStatus.UNPROCESSABLE_ENTITY)

    const newPower = getPowerForLevelUp(people[peopleToUpdateIndex].faction)

    people[peopleToUpdateIndex] = { ...people[peopleToUpdateIndex], power: people[peopleToUpdateIndex].power + newPower }
    return createPeopleDtoToPeople(people[peopleToUpdateIndex])
  }
}
