import { Kind, People } from './people'

const MAX_POWER_JEDI = 150
const MAX_POWER_MASTER_JEDI = 250
const MAX_POWER_SITH = 150
const MAX_POWER_SITH_LORD = 250
const MAX_POWER_DROID = 30
const MAX_POWER_IMPERIAL_OFFICER = 90
const MAX_POWER_STORM_TROOPER = 60
const MAX_POWER_SOLDIER = 40
const MAX_POWER_WOOKIE = 50

export function canBeLeveledUp(people: People): boolean {
  switch (people.kind) {
    case Kind.JEDI:
      return people.power < MAX_POWER_JEDI
    case Kind.JEDI_MASTER:
      return people.power < MAX_POWER_MASTER_JEDI
    case Kind.SITH:
      return people.power < MAX_POWER_SITH
    case Kind.SITH_LORD:
      return people.power < MAX_POWER_SITH_LORD
    case Kind.DROID:
      return people.power < MAX_POWER_DROID
    case Kind.IMPERIAL_OFFICER:
      return people.power < MAX_POWER_IMPERIAL_OFFICER
    case Kind.STORM_TROOPER:
      return people.power < MAX_POWER_STORM_TROOPER
    case Kind.SOLDIER:
      return people.power < MAX_POWER_SOLDIER
    case Kind.WOOKIE:
      return people.power < MAX_POWER_WOOKIE
  }
}
