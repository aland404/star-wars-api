import type { People } from '../domain/people'
import { Faction, Kind } from '../domain/people'

export const rebellionDroid = {
  slug: `${Faction.REBELLION}-${Kind.DROID}`,
  kind: Kind.DROID,
  faction: Faction.REBELLION,
  power: 20,
}
export const empireDroid = {
  slug: `${Faction.EMPIRE}-${Kind.DROID}`,
  kind: Kind.DROID,
  faction: Faction.EMPIRE,
  power: 20,
}

export const jedi = {
  slug: Kind.JEDI,
  kind: Kind.JEDI,
  faction: Faction.REBELLION,
  power: 100,
}

export const jediMaster = {
  slug: Kind.JEDI_MASTER,
  kind: Kind.JEDI_MASTER,
  faction: Faction.REBELLION,
  power: 200,
}

export const stormTrooper = {
  slug: Kind.STORM_TROOPER,
  kind: Kind.STORM_TROOPER,
  faction: Faction.EMPIRE,
  power: 40,
}

export const sith = {
  slug: Kind.SITH,
  kind: Kind.SITH,
  faction: Faction.EMPIRE,
  power: 100,
}

export const sithLord = {
  slug: Kind.SITH_LORD,
  kind: Kind.SITH_LORD,
  faction: Faction.EMPIRE,
  power: 200,
}

export const rebellionSoldier = {
  slug: `${Faction.REBELLION}-${Kind.SOLDIER}`,
  kind: Kind.SOLDIER,
  faction: Faction.REBELLION,
  power: 10,
}

export const wookie = {
  slug: Kind.WOOKIE,
  kind: Kind.WOOKIE,
  faction: Faction.REBELLION,
  power: 50,
}
export const imperialOfficer = {
  slug: Kind.IMPERIAL_OFFICER,
  kind: Kind.IMPERIAL_OFFICER,
  faction: Faction.EMPIRE,
  power: 30,
}
export const empireSoldier = {
  slug: `${Faction.EMPIRE}-${Kind.SOLDIER}`,
  kind: Kind.SOLDIER,
  faction: Faction.EMPIRE,
  power: 10,
}

export const people: People[] = [
  jedi,
  jediMaster,
  sith,
  sithLord,
  wookie,
  imperialOfficer,
  rebellionSoldier,
  empireSoldier,
  stormTrooper,
  rebellionDroid,
  empireDroid,
]
