import { Test, TestingModule } from '@nestjs/testing';
import { PeopleRepository } from "../../../domain/peopleRepository.interface";
import { peopleForTest } from "../../../tests/data/people";
import { InMemoryPeopleRepository } from "../../people.repository";
import { PeopleController } from "../people.controller";

const MockedPeople = jest.requireMock('../../people');

jest.mock('../../people', () => ({
  people: []
}))

describe('UNIT - AppController - getPeople', () => {
  let appController: PeopleController;

  beforeEach(async () => {
    jest.resetModules()

    const app: TestingModule = await Test.createTestingModule({
      controllers: [PeopleController],
      providers: [{provide: PeopleRepository, useClass: InMemoryPeopleRepository}],
    }).compile();

    appController = app.get<PeopleController>(PeopleController);
  });

  describe('getPeople', () => {
    it('should return 2 people', () => {
      MockedPeople.people = [...peopleForTest.twoRandomPeople]

      const foundPeople = appController.getPeople()

      expect(foundPeople.length).toBe(2);
    });
  });
});
