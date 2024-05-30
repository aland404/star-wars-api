import {People} from "../../../people/domain/people";
import {BattleResult, Place, WarResult} from "../../domain";

export type WarPresenter = {
    slug: string,
    name: string,
    description?: string,
    battles: BattlePresenter[]
}

export type WarSummaryPresenter = {
    name: string,
    description?: string,
    loser: WarResult,
    winner: WarResult
}

export type TroopPresenter = {
    people: People,
    number: number
}

export type BattlePresenter = {
    slug: string,
    name: string,
    description?: string,
    location: LocationPresenter,
    troops: TroopPresenter[]
}

export type BattleSummupPresenter = {
    name: string,
    winner: BattleResult | undefined,
    loser: BattleResult | undefined
}

export type LocationPresenter = {
    name: string,
    place: Place,
    coordinates?: { x: number, y: number }
}