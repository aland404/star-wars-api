import type { TestingModule } from '@nestjs/testing'
import { Test } from '@nestjs/testing'
import { PeopleRepository } from '../../../domain/peopleRepository.interface'
import { peopleForTest } from '../../../tests/data/people'
import { InMemoryPeopleRepository } from '../../people.repository'
import { PeopleController } from '../people.controller'

const MockedPeople = jest.requireMock('../../people')

jest.mock('../../people', () => ({
  people: [],
}))

describe('uNIT - AppController - deleteAPeopleBySlug', () => {
  let appController: PeopleController

  beforeEach(async () => {
    jest.resetModules()

    const app: TestingModule = await Test.createTestingModule({
      controllers: [PeopleController],
      providers: [{ provide: PeopleRepository, useClass: InMemoryPeopleRepository }],
    }).compile()

    appController = app.get<PeopleController>(PeopleController)
  })

  it('should delete the first people', () => {
    MockedPeople.people = [...peopleForTest.jedis]
    const peopleToDelete = peopleForTest.jedis[0]

    const deletedInfo = appController.deletePeopleBySlug(peopleToDelete.slug)

    expect(deletedInfo).toBe(`People with slug ${peopleToDelete.slug} has been deleted`)
  })

  it('should delete the second people', () => {
    MockedPeople.people = [...peopleForTest.jedis]
    const peopleToDelete = peopleForTest.jedis[1]

    const deletedInfo = appController.deletePeopleBySlug(peopleToDelete.slug)

    expect(deletedInfo).toBe(`People with slug ${peopleToDelete.slug} has been deleted`)
  })
})
