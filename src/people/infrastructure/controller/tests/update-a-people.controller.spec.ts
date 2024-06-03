import { HttpException } from '@nestjs/common'
import type { TestingModule } from '@nestjs/testing'
import { Test } from '@nestjs/testing'
import { PeopleRepository } from '../../../domain/peopleRepository.interface'
import { peopleForTest } from '../../../tests/data/people'
import { UpdatePeopleDto } from '../../dtos'
import { InMemoryPeopleRepository } from '../../people.repository'
import { PeopleController } from '../people.controller'
import { Faction } from '../../../domain/people'

const MockedPeople = jest.requireMock('../../people')

jest.mock('../../people', () => ({
  people: [],
}))

describe('uNIT - AppController - updateAPeople', () => {
  let appController: PeopleController

  beforeEach(async () => {
    jest.resetModules()

    const app: TestingModule = await Test.createTestingModule({
      controllers: [PeopleController],
      providers: [{ provide: PeopleRepository, useClass: InMemoryPeopleRepository }],
    }).compile()

    appController = app.get<PeopleController>(PeopleController)
  })

  it('should update partially the people info', () => {
    MockedPeople.people = [...peopleForTest.jedis]
    const peopleToUpdate = peopleForTest.jedis[1]
    const infoToUpdate: UpdatePeopleDto = {
      power: peopleToUpdate.power + 10,
    }

    const updatedPeople = appController.updateAPeople(peopleToUpdate.slug, infoToUpdate)

    expect(updatedPeople).toStrictEqual({ ...peopleToUpdate, ...infoToUpdate })
  })
  it('should crash with no matching people found error', async () => {
    MockedPeople.people = [...peopleForTest.jedis]
    const peopleToUpdate = { ...peopleForTest.jedis[1], slug: 'Inexisting slug' }

    const infoToUpdate: UpdatePeopleDto = {
      power: 50,
      faction: Faction.REBELLION,
    }

    try {
      await appController.updateAPeople(peopleToUpdate.slug, infoToUpdate)
      expect(true).toBe(false)
    }
    catch (error) {
      expect(error).toBeInstanceOf(HttpException)
    }
  })
})
