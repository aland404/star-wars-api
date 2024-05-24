import {InMemoryPeopleRepository} from "./people.repository";
import {PeopleRepository} from "../domain/peopleRepository.interface";
import {people as peopleInDb} from "./people";
import {Faction} from "../domain/people";

describe('InMemoryPeopleRepository', () => {
    let peopleRepository: PeopleRepository = new InMemoryPeopleRepository();

    describe('#getPeople', () => {
        describe('without filters', () => {
            it('returns all the people', function () {
                const people = peopleRepository.getPeople()

                expect(people).toEqual(peopleInDb)
            })
        })

        describe('with filters', () => {
            describe('faction', () => {
                it('returns all the people from the empire faction', function () {
                    const people = peopleRepository.getPeople(Faction.EMPIRE)

                    expect(people).toEqual(peopleInDb.filter(people => people.faction === Faction.EMPIRE))
                })
            })
        })
    })
})