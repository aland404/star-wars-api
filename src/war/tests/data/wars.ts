import {BattleEntity, WarEntity} from "../../infrastructure/entities";
import {Place} from "../../domain";
import {Faction, Kind} from "../../../people/domain/people";

const deathStarBattle: BattleEntity = {
    slug: "conquest-for-the-death-star-1",
    name: 'Conquest for the death-star',
    location: {slug: "death-star", name: "Death Star", place: Place.SPACE},
    troops: [
        {
            slug: 'troop-1',
            people: {
                slug: 'jedis-rebellion',
                power: 100,
                faction: Faction.REBELLION,
                kind: Kind.JEDI
            },
            number: 5
        },
        {
            slug: 'troop-2',
            people: {
                slug: 'storm-troopers-empire',
                power: 25,
                faction: Faction.EMPIRE,
                kind: Kind.STORM_TROOPER
            },
            number: 25
        }
    ]
}

const andorBattle: BattleEntity = {
    slug: "andor-battle-1",
    name: 'Andor battle',
    location: {slug: "andor", name: "Andor planet", place: Place.ANDOR},
    troops: [
        {
            slug: 'troop-1',
            people: {
                slug: 'jedis-rebellion',
                power: 100,
                faction: Faction.EMPIRE,
                kind: Kind.SITH_LORD
            },
            number: 150
        },
        {
            slug: 'troop-2',
            people: {
                slug: 'storm-troopers-empire',
                power: 70,
                faction: Faction.EMPIRE,
                kind: Kind.DROID
            },
            number: 2
        },
        {
            slug: 'troop-3',
            people: {
                slug: 'soldiers-empire',
                power: 10,
                faction: Faction.REBELLION,
                kind: Kind.SOLDIER
            },
            number: 50
        }
    ]
}

const clientApiWar: WarEntity = {
    slug: "client-api-war",
    name: "La guerre des clients APIS",
    battles: [deathStarBattle, andorBattle],
    description: "Une guerre sans merci qui opposent différentes factions revendiquant chacune leur meilleur client d'API."
}

export const warsForTest = {
    aWar: clientApiWar
}