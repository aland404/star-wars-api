import type { TestingModule } from '@nestjs/testing'
import { Test } from '@nestjs/testing'
import type { INestApplication } from '@nestjs/common'
import { ValidationPipe } from '@nestjs/common'
import * as request from 'supertest'
import { warsForTest } from '../src/war/tests/data/wars'
import type { WarPresenter } from '../src/war/infrastructure/presenters/war-presenter'
import type { WarEntity } from '../src/war/infrastructure/entities'
import { AppModule } from './../src/app.module'

const MockedPeople = jest.requireMock('../src/war/infrastructure/in-memory-wars')

jest.mock('../src/war/infrastructure/in-memory-wars', () => ({
  wars: [],
}))

describe('AppController (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    MockedPeople.wars = [warsForTest.aWar]

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    app.useGlobalPipes(new ValidationPipe())
    await app.init()
  })

  it('/wars/client-api-war (GET 200)', () => {
    const wars: WarEntity[] = MockedPeople.wars
    const expectedWars: WarPresenter = {
      slug: wars[0].slug,
      name: wars[0].name,
      description: wars[0].description,
      battles: wars[0].battles.map(battle => ({
        slug: battle.slug,
        name: battle.name,
        description: battle.description,
        location: battle.location,
        troops: battle.troops.map(troop => ({
          slug: troop.slug,
          people: troop.people,
          number: troop.number,
        })),
      })),
    }

    return request(app.getHttpServer())
      .get('/wars')
      .expect(200)
      .expect(expectedWars)
  })

  it('/wars/client-api-war (GET 200)', () => {
    const wars: WarEntity[] = MockedPeople.wars
    const expectedWar: WarPresenter = {
      name: wars[0].name,
      description: wars[0].description,
      battles: wars[0].battles.map(war => ({
        name: war.name,
        description: war.description,
        location: war.location,
        troops: war.troops.map(troop => ({
          people: troop.people,
          number: troop.number,
        })),
      })),
    }

    return request(app.getHttpServer())
      .get(`/wars/${warsForTest.aWar.slug}`)
      .expect(200)
      .expect(expectedWar)
  })

  it('/wars/unexisting-war (GET 404)', () => {
    return request(app.getHttpServer())
      .get('/wars/unexisting-war')
      .expect(404)
  })
})
