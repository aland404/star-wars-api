import { Test, TestingModule } from '@nestjs/testing';
import { PeopleRepository } from "../../../domain/peopleRepository.interface";
import { peopleForTest } from "../../../tests/data/people";
import { InMemoryPeopleRepository } from "../../people.repository";
import { PeopleController } from "../people.controller";

const MockedPeople = jest.requireMock('../../people');

jest.mock('../../people', () => ({
  people: []
}))

describe('UNIT - AppController - getAPeopleBySlug', () => {
  let appController: PeopleController;

  beforeEach(async () => {
    jest.resetModules()

    const app: TestingModule = await Test.createTestingModule({
      controllers: [PeopleController],
      providers: [{provide: PeopleRepository, useClass: InMemoryPeopleRepository}],
    }).compile();

    appController = app.get<PeopleController>(PeopleController);
  });

  describe('getAPeopleBySlug', () => {
    it('should find the corresponding people', () => {
      MockedPeople.people = [...peopleForTest.jedis]
      const peopleToFind = peopleForTest.jedis[1]

      const foundPeople = appController.getAPeopleBySlug(peopleToFind.slug)

      expect(foundPeople).toBe(peopleToFind);
    });


    it('should not find the corresponding people', () => {
      MockedPeople.people = [...peopleForTest.jedis]
      const peopleToFind = peopleForTest.unexistingPeople

      const foundPeople = appController.getAPeopleBySlug(peopleToFind.slug)

      expect(foundPeople).toBe(undefined);
    });
  });
});
