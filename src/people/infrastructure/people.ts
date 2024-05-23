import {Faction, Kind, People} from "../domain/people";

export const people: People[] = [
    {
        slug: Kind.JEDI,
        kind: Kind.JEDI,
        faction: Faction.REBELLION,
        power: 100
    },
    {
        slug: Kind.JEDI_MASTER,
        kind: Kind.JEDI_MASTER,
        faction: Faction.REBELLION,
        power: 200
    },
    {
        slug: Kind.SITH,
        kind: Kind.SITH,
        faction: Faction.EMPIRE,
        power: 100
    },
    {
        slug: Kind.SITH_LORD,
        kind: Kind.SITH_LORD,
        faction: Faction.EMPIRE,
        power: 200
    },
    {
        slug: Kind.BOUNTY_HUNTER,
        kind: Kind.BOUNTY_HUNTER,
        faction: Faction.NONE,
        power: 75
    },
    {
        slug: Kind.WOOKIE,
        kind: Kind.WOOKIE,
        faction: Faction.REBELLION,
        power: 50
    },
    {
        slug: Kind.IMPERIAL_OFFICER,
        kind: Kind.IMPERIAL_OFFICER,
        faction: Faction.EMPIRE,
        power: 30
    },
    {
        slug: `${Faction.REBELLION}-${Kind.SOLDIER}`,
        kind: Kind.SOLDIER,
        faction: Faction.REBELLION,
        power: 10
    },
    {
        slug: `${Faction.EMPIRE}-${Kind.SOLDIER}`,
        kind: Kind.SOLDIER,
        faction: Faction.EMPIRE,
        power: 10
    },
    {
        slug: Kind.STORM_TROOPER,
        kind: Kind.STORM_TROOPER,
        faction: Faction.EMPIRE,
        power: 40
    },
    {
        slug: `${Faction.REBELLION}-${Kind.DROID}`,
        kind: Kind.DROID,
        faction: Faction.REBELLION,
        power: 20
    },
    {
        slug: `${Faction.EMPIRE}-${Kind.DROID}`,
        kind: Kind.DROID,
        faction: Faction.EMPIRE,
        power: 20
    },
]