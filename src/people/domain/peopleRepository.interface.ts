import {CreatePeopleDto, UpdatePeopleDto} from "../infrastructure/dtos";
import {Faction} from "./people";
import {PeopleEntity} from "../infrastructure/entities";

export interface PeopleRepository {
    createAPeople(peopleToCreate: CreatePeopleDto): PeopleEntity
    getPeople(faction?: Faction): PeopleEntity[]
    deleteAPeopleBySug(peopleSlug: string): string
    getAPeopleBySlug(slug: string): PeopleEntity | undefined
    updateAPeople(peopleSlug: string, peopleToUpdate: UpdatePeopleDto): PeopleEntity
}

export const PeopleRepository = Symbol("PeopleRepository")