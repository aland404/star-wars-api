import {BattleEntity, WarEntity} from "./entities";
import {Place} from "../domain";
import {Faction, Kind} from "../../people/domain/people";
import {empireDroid, jedi, sithLord, rebellionSoldier, stormTrooper} from "../../people/infrastructure/people";

const deathStarBattle: BattleEntity = {
    slug: "conquest-for-the-death-star-1",
    name: 'Conquest for the Death Star',
    location: {slug: "death-star", name: "Death Star", place: Place.SPACE},
    troops: [
        {slug: 'troop-1', people: jedi, number: 5},
        {slug: 'troop-2', people: stormTrooper, number: 25}
    ]
}

const andorBattle: BattleEntity = {
    slug: "andor-battle-1",
    name: 'Andor battle',
    location: {slug: "andor", name: "Andor planet", place: Place.ANDOR, coordinates: {x: 50.234, y: -18.56}},
    troops: [
        {slug: 'troop-1', people: sithLord, number: 2},
        {slug: 'troop-2', people: empireDroid, number: 2},
        {slug: 'troop-3', people: rebellionSoldier, number: 50}
    ]
}

const clientApiWar: WarEntity = {
    slug: "client-api-war",
    name: "La guerre des clients APIS",
    battles: [deathStarBattle, andorBattle],
    description: "Une guerre sans merci qui opposent différentes factions revendiquant chacune leur meilleur client d'API."
}

export const wars: WarEntity[] = [
    clientApiWar
]