import type { CreatePeopleDto, UpdatePeopleDto } from '../infrastructure/dtos'
import type { PeopleEntity } from '../infrastructure/entities'
import type { Faction } from './people'

export interface PeopleRepository {
  createAPeople: (peopleToCreate: CreatePeopleDto) => PeopleEntity
  getPeople: (faction?: Faction) => PeopleEntity[]
  deleteAPeopleBySug: (peopleSlug: string) => string
  getAPeopleBySlug: (slug: string) => PeopleEntity | undefined
  updateAPeople: (peopleSlug: string, peopleToUpdate: UpdatePeopleDto) => PeopleEntity
  levelUpAPeople: (peopleSlug: string) => PeopleEntity
}

// eslint-disable-next-line ts/no-redeclare
export const PeopleRepository = Symbol('PeopleRepository')
