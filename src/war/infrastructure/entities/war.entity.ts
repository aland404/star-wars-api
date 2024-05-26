import {Place} from "../../domain";
import {People} from "../../../people/domain/people";

export type WarEntity = {
    slug: string,
    name: string,
    description?: string,
    battles: BattleEntity[]
}

export type TroopEntity = {
    slug: string,
    people: People,
    number: number
}

export type BattleEntity = {
    slug: string,
    name: string,
    description?: string,
    location: LocationEntity,
    troops: TroopEntity[]
}

export type LocationEntity = {
    slug: string,
    name: string,
    place: Place,
    coordinates?: { x: number, y: number }
}