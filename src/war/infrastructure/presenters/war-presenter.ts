import {People} from "../../../people/domain/people";
import {Place} from "../../domain";

export type WarPresenter = {
    slug: string,
    name: string,
    description?: string,
    battles: BattlePresenter[]
}

export type TroopPresenter = {
    people: People,
    number: number
}

export type BattlePresenter = {
    name: string,
    description?: string,
    location: LocationPresenter,
    troops: TroopPresenter[]
}

export type LocationPresenter = {
    name: string,
    place: Place,
    coordinates?: { x: number, y: number }
}