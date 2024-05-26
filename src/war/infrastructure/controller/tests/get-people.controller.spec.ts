import {Test, TestingModule} from '@nestjs/testing';
import {PeopleRepository} from "../../../domain/peopleRepository.interface";
import {peopleForTest} from "../../../tests/data/people";
import {InMemoryPeopleRepository} from "../../people.repository";
import {WarController} from "../war.controller";

const MockedPeople = jest.requireMock('../../people');

jest.mock('../../people', () => ({
    people: []
}))

describe('UNIT - AppController - getPeople', () => {
    let appController: WarController;

    beforeEach(async () => {
        jest.resetModules()

        const app: TestingModule = await Test.createTestingModule({
            controllers: [WarController],
            providers: [{provide: PeopleRepository, useClass: InMemoryPeopleRepository}],
        }).compile();

        appController = app.get<WarController>(WarController);
    });

    it('should return 2 people', () => {
        MockedPeople.people = [...peopleForTest.jedis]

        const foundPeople = appController.getWars()

        expect(foundPeople.length).toBe(2);
    });
});
