import type { TestingModule } from '@nestjs/testing'
import { Test } from '@nestjs/testing'
import type { INestApplication } from '@nestjs/common'
import { ValidationPipe } from '@nestjs/common'
import * as request from 'supertest'
import { peopleForTest } from '../src/people/tests/data/people'
import { UpdatePeopleDto } from '../src/people/infrastructure/dtos'
import { Faction } from '../src/people/domain/people'
import { AppModule } from './../src/app.module'

const MockedPeople = jest.requireMock('../src/people/infrastructure/people')

jest.mock('../src/people/infrastructure/people', () => ({
  people: [],
}))

describe('AppController (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    MockedPeople.people = [...peopleForTest.aMixOfDifferentKindOfPeople]

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    app.useGlobalPipes(new ValidationPipe())
    await app.init()
  })

  it('/people (GET 200)', () => {
    return request(app.getHttpServer())
      .get('/people')
      .expect(200)
      .expect(MockedPeople.people)
  })

  it('/people?faction=rebellion (GET 200)', () => {
    return request(app.getHttpServer())
      .get('/people?faction=rebellion')
      .expect(200)
      .expect(peopleForTest.jedis)
  })

  it('/people?faction=unexpectedFaction (GET 400)', () => {
    return request(app.getHttpServer())
      .get('/people?faction=unexpectedFaction')
      .expect(400)
  })

  it('/people/:peopleSlug (DELETE)', () => {
    const peopleToDelete = peopleForTest.jedis[0]

    return request(app.getHttpServer())
      .delete(`/people/${peopleToDelete.slug}`)
      .expect(200)
      .expect(`People with slug ${peopleToDelete.slug} has been deleted`)
  })

  it('/people/:peopleSlug (PUT)', () => {
    const peopleToUpdate = peopleForTest.jedis[1]
    const fieldsToUpdate: UpdatePeopleDto = {
      faction: Faction.REBELLION,
      power: 77,
    }

    return request(app.getHttpServer())
      .put(`/people/${peopleToUpdate.slug}`)
      .send(fieldsToUpdate)
      .expect(200)
      .expect({ ...peopleToUpdate, ...fieldsToUpdate })
  })
})
