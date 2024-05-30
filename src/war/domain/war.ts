import {Faction} from "../../people/domain/people";


export type BattleResult = {
    faction: Faction,
    totalPower: number
}
export type WarResult = {
    faction: Faction,
    nbOfVictories: number
}

export enum Place {
    EARTH = "earth",
    ANDOR = "andor",
    SPACE= "space"
}