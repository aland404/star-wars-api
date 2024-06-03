import type { TestingModule } from '@nestjs/testing'
import { Test } from '@nestjs/testing'
import { HttpException } from '@nestjs/common'
import { PeopleRepository } from '../../../domain/peopleRepository.interface'
import { peopleForTest } from '../../../tests/data/people'
import { CreatePeopleDto } from '../../dtos'
import { InMemoryPeopleRepository } from '../../people.repository'
import { PeopleController } from '../people.controller'
import { Faction, Kind } from '../../../domain/people'

const MockedPeople = jest.requireMock('../../people')

jest.mock('../../people', () => ({
  people: [],
}))

describe('uNIT - AppController - createAPeople', () => {
  let appController: PeopleController

  beforeEach(async () => {
    jest.resetModules()

    const app: TestingModule = await Test.createTestingModule({
      controllers: [PeopleController],
      providers: [{ provide: PeopleRepository, useClass: InMemoryPeopleRepository }],
    }).compile()

    appController = app.get<PeopleController>(PeopleController)
  })

  it('should create a people with all values', () => {
    MockedPeople.people = [...peopleForTest.jedis]
    const peopleToCreate: CreatePeopleDto = {
      slug: 'chewie',
      kind: Kind.WOOKIE,
      faction: Faction.REBELLION,
      power: 50,
    }

    const createdPeople = appController.createAPeople(peopleToCreate)

    expect(createdPeople).toStrictEqual(peopleToCreate)
  })
  it('should crash with slug already existing error', async () => {
    MockedPeople.people = [...peopleForTest.jedis]
    const peopleToCreate: CreatePeopleDto = {
      slug: peopleForTest.jedis[0].slug,
      kind: Kind.WOOKIE,
      faction: Faction.REBELLION,
      power: 50,
    }

    try {
      await appController.createAPeople(peopleToCreate)
      expect(true).toBe(false)
    }
    catch (error) {
      expect(error).toBeInstanceOf(HttpException)
    }
  })
})
