import {Test, TestingModule} from '@nestjs/testing';
import {INestApplication, ValidationPipe} from '@nestjs/common';
import * as request from 'supertest';
import {AppModule} from './../src/app.module';
import {peopleForTest} from "../src/people/tests/data/people";
import {UpdatePeopleDto} from "../src/people/infrastructure/dtos";
import {Faction} from "../src/people/domain/people";

const MockedPeople = jest.requireMock('../src/people/infrastructure/people');

jest.mock('../src/people/infrastructure/people', () => ({
  people: []
}))

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    MockedPeople.people = [...peopleForTest.twoRandomPeople]

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it('/people (GET)', () => {
    return request(app.getHttpServer())
        .get('/people')
        .expect(200)
        .expect(MockedPeople.people);
  });

  it('/people/:peopleSlug (DELETE)', () => {
    const peopleToDelete = peopleForTest.twoRandomPeople[0]

    return request(app.getHttpServer())
        .delete(`/people/${peopleToDelete.slug}`)
        .expect(200)
        .expect(`People with slug ${peopleToDelete.slug} has been deleted`);
  });

  it('/people/:peopleSlug (PUT)', () => {
    const peopleToUpdate = peopleForTest.twoRandomPeople[1]
    const fieldsToUpdate: UpdatePeopleDto = {
      faction: Faction.REBELLION,
      power: 77
    }

    return request(app.getHttpServer())
        .put(`/people/${peopleToUpdate.slug}`)
        .send(fieldsToUpdate)
        .expect(200)
        .expect({ ...peopleToUpdate, ...fieldsToUpdate });
  });
});
