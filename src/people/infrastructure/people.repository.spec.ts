import type { PeopleRepository } from '../domain/peopleRepository.interface'
import { Faction } from '../domain/people'
import { InMemoryPeopleRepository } from './people.repository'
import { people as peopleInDb } from './people'

describe('inMemoryPeopleRepository', () => {
  const peopleRepository: PeopleRepository = new InMemoryPeopleRepository()

  describe('#getPeople', () => {
    describe('without filters', () => {
      it('returns all the people', () => {
        const people = peopleRepository.getPeople()

        expect(people).toEqual(peopleInDb)
      })
    })

    describe('with filters', () => {
      describe('faction', () => {
        it('returns all the people from the empire faction', () => {
          const people = peopleRepository.getPeople(Faction.EMPIRE)

          expect(people).toEqual(peopleInDb.filter(people => people.faction === Faction.EMPIRE))
        })
      })
    })
  })
})
