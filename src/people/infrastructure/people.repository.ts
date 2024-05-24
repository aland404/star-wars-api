import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {Faction, People} from "../domain/people";
import {PeopleRepository} from "../domain/peopleRepository.interface";
import {CreatePeopleDto, UpdatePeopleDto} from "./dtos";
import {createPeopleDtoToPeople} from './mappers';
import {people} from "./people";


@Injectable()
export class InMemoryPeopleRepository implements PeopleRepository {
    getPeople(faction?: Faction): People[] {
        if (faction) {
            return people.filter(currentPeople => currentPeople.faction === faction)
        }

        return people
    }

    deleteAPeopleBySug(peopleSlug: string): string {
        const peopleIndex = people.findIndex(people => {
            return people.slug === peopleSlug
        })
        if (peopleIndex < 0) return 'No corresponding people found'

        people.splice(peopleIndex, 1)
        return `People with slug ${peopleSlug} has been deleted`
    }

    getAPeopleBySlug(slug: string): People | undefined {
        return people.find(people => people.slug === slug);
    }

    updateAPeople(peopleSlug: string, peopleToUpdate: UpdatePeopleDto): People {
        const peopleToUpdateIndex = people.findIndex(people => people.slug === peopleSlug)
        if (peopleToUpdateIndex < 0) throw new HttpException('No corresponding people found', HttpStatus.NOT_FOUND)

        people[peopleToUpdateIndex] = {...people[peopleToUpdateIndex], ...peopleToUpdate}

        return people[peopleToUpdateIndex]
    }

    createAPeople(peopleToCreate: CreatePeopleDto): People {
        const peopleToUpdateIndex = people.findIndex(people => people.slug === peopleToCreate.slug)
        if (peopleToUpdateIndex >= 0) throw new HttpException('Slug already existing', HttpStatus.CONFLICT)

        const peopleToAdd: People = createPeopleDtoToPeople(peopleToCreate)
        people.push(peopleToAdd)

        return peopleToAdd
    }
}
