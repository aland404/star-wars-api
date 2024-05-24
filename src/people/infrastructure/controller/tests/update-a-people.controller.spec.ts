import { HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PeopleRepository } from "../../../domain/peopleRepository.interface";
import { peopleForTest } from "../../../tests/data/people";
import { UpdatePeopleDto } from "../../dtos";
import { InMemoryPeopleRepository } from "../../people.repository";
import { PeopleController } from "../people.controller";

const MockedPeople = jest.requireMock('../../people');

jest.mock('../../people', () => ({
  people: []
}))

describe('UNIT - AppController - updateAPeople', () => {
  let appController: PeopleController;

  beforeEach(async () => {
    jest.resetModules()

    const app: TestingModule = await Test.createTestingModule({
      controllers: [PeopleController],
      providers: [{provide: PeopleRepository, useClass: InMemoryPeopleRepository}],
    }).compile();

    appController = app.get<PeopleController>(PeopleController);
  });

  describe('updateAPeople', () => {
    it('should update all the people info', () => {
      MockedPeople.people = [...peopleForTest.jedis]
      const peopleToUpdate = peopleForTest.jedis[1]
      const infoToUpdate = {
        slug: peopleToUpdate.slug,
        actors: "My new actors",
        awards: "My new awards",
        boxOffice: "My new boxOffice",
        director: "My new director",
        genre: "My new genre",
        imdbRating: "My new imdbRating",
        imdbVotes: "My new imdbVotes",
        plot: "My new plot",
        poster: "My new poster",
        released: "My new released",
        runtime: "My new runtime",
        title: "My new title",
        type: "My new type",
        writer: "My new writer",
        year: "My new actors"
      }

      const updatedPeople = appController.updateAPeople(peopleToUpdate.slug, infoToUpdate)

      expect(updatedPeople).toStrictEqual(infoToUpdate);
    });

    it('should update partially the people info', () => {
      MockedPeople.people = [...peopleForTest.jedis]
      const peopleToUpdate = peopleForTest.jedis[1]
      const infoToUpdate: UpdatePeopleDto = {
        slug: peopleToUpdate.slug,
        director: "My new director",
        genre: "My new genre",
        imdbVotes: "My new imdbVotes",
        plot: "My new plot",
        poster: "My new poster"
      }

      const updatedPeople = appController.updateAPeople(peopleToUpdate.slug, infoToUpdate)

      expect(updatedPeople).toStrictEqual({ ...peopleToUpdate, ...infoToUpdate });
    });
    it('should crash with different slug error', async () => {
      MockedPeople.people = [...peopleForTest.jedis]
      const peopleToUpdate = peopleForTest.jedis[1]
      const infoToUpdate = {
        slug: "My different slug",
        actors: "My new actors",
        awards: "My new awards",
        boxOffice: "My new boxOffice",
        director: "My new director",
        genre: "My new genre",
        imdbRating: "My new imdbRating",
        imdbVotes: "My new imdbVotes",
        plot: "My new plot",
        poster: "My new poster",
        released: "My new released",
        runtime: "My new runtime",
        title: "My new title",
        type: "My new type",
        writer: "My new writer",
        year: "My new actors"
      }

      try {
        await appController.updateAPeople(peopleToUpdate.slug, infoToUpdate)
        expect(true).toBe(false)
      } catch(error) {
        expect(error).toBeInstanceOf(HttpException)
      }
    });
    it('should crash with no matching people found error', async () => {
      MockedPeople.people = [...peopleForTest.jedis]
      const peopleToUpdate = { ...peopleForTest.jedis[1], slug: "Inexisting slug" }
      
      const infoToUpdate = {
        slug: peopleToUpdate.slug,
        actors: "My new actors",
        awards: "My new awards",
        boxOffice: "My new boxOffice",
        director: "My new director",
        genre: "My new genre",
        imdbRating: "My new imdbRating",
        imdbVotes: "My new imdbVotes",
        plot: "My new plot",
        poster: "My new poster",
        released: "My new released",
        runtime: "My new runtime",
        title: "My new title",
        type: "My new type",
        writer: "My new writer",
        year: "My new actors"
      }

      try {
        await appController.updateAPeople(peopleToUpdate.slug, infoToUpdate)
        expect(true).toBe(false)
      } catch(error) {
        expect(error).toBeInstanceOf(HttpException)
      }
    });
  });
});
