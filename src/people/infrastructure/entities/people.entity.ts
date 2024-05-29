import {Faction, Kind} from "../../domain/people";

export type PeopleEntity = {
    slug: string,
    kind: Kind,
    power: number,
    faction: Faction
}