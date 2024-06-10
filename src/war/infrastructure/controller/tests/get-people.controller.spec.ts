import type { TestingModule } from '@nestjs/testing'
import { Test } from '@nestjs/testing'
import { WarController } from '../war.controller'
import { PeopleRepository } from '../../../../people/domain/peopleRepository.interface'
import { InMemoryPeopleRepository } from '../../../../people/infrastructure/people.repository'
import { peopleForTest } from '../../../../people/tests/data/people'

const MockedPeople = jest.requireMock('../../people')

jest.mock('../../people', () => ({
  people: [],
}))

describe('uNIT - AppController - getPeople', () => {
  let appController: WarController

  beforeEach(async () => {
    jest.resetModules()

    const app: TestingModule = await Test.createTestingModule({
      controllers: [WarController],
      providers: [{ provide: PeopleRepository, useClass: InMemoryPeopleRepository }],
    }).compile()

    appController = app.get<WarController>(WarController)
  })

  it('should return 2 people', () => {
    MockedPeople.people = [...peopleForTest.jedis]

    const foundPeople = appController.getWars()

    expect(foundPeople.length).toBe(2)
  })
})
