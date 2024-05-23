import {CreatePeopleDto, UpdatePeopleDto} from "../infrastructure/dtos";
import {People} from "./people";

export interface PeopleRepository {
    createAPeople(peopleToCreate: CreatePeopleDto): People
    getPeople(): People[]
    deleteAPeopleBySug(peopleSlug: string): string
    getAPeopleBySlug(slug: string): People | undefined
    updateAPeople(peopleSlug: string, peopleToUpdate: UpdatePeopleDto): People
}

export const PeopleRepository = Symbol("PeopleRepository")