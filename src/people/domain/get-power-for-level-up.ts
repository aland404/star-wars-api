import { Faction } from './people'

export function getPowerForLevelUp(faction: Faction) {
  switch (faction) {
    case Faction.REBELLION:
      return 1
    case Faction.EMPIRE:
      return 10
    default:
      return 1
  }
}
