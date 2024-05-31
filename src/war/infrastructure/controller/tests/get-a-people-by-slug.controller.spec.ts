import type { TestingModule } from '@nestjs/testing'
import { Test } from '@nestjs/testing'
import { WarController } from '../war.controller'
import {PeopleRepository} from "../../../../people/domain/peopleRepository.interface";
import {InMemoryPeopleRepository} from "../../../../people/infrastructure/people.repository";
import {peopleForTest} from "../../../../people/tests/data/people";

const MockedPeople = jest.requireMock('../../people')

jest.mock('../../people', () => ({
  people: [],
}))

describe('uNIT - AppController - getAPeopleBySlug', () => {
  let appController: WarController

  beforeEach(async () => {
    jest.resetModules()

    const app: TestingModule = await Test.createTestingModule({
      controllers: [WarController],
      providers: [{ provide: PeopleRepository, useClass: InMemoryPeopleRepository }],
    }).compile()

    appController = app.get<WarController>(WarController)
  })

  it('should find the corresponding people', () => {
    MockedPeople.people = [...peopleForTest.jedis]
    const peopleToFind = peopleForTest.jedis[1]

    const foundPeople = appController.getAWarBySlug(peopleToFind.slug)

    expect(foundPeople).toBe(peopleToFind)
  })

  it('should not find the corresponding people', () => {
    MockedPeople.people = [...peopleForTest.jedis]
    const peopleToFind = peopleForTest.unexistingPeople

    const foundPeople = appController.getAWarBySlug(peopleToFind.slug)

    expect(foundPeople).toBe(undefined)
  })
})
