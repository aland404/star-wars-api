import {Faction} from "../../people/domain/people";

export type War = {
    name: string
    location: Location,
    winner: Winner
}

export type Winner = {
    faction: Faction,
    totalPower: number
}

export type Location = {
    name: string,
    place: Place
}

export enum Place {
    EARTH = "earth",
    ANDOR = "andor",
    SPACE= "space"
}