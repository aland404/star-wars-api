import {Faction, Kind} from "../../domain/people";

export type PeoplePresenter = {
    slug: string,
    kind: Kind,
    power: number,
    faction: Faction
}