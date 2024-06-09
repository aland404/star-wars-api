import type { Faction } from '../../people/domain/people'

export interface BattleResult {
  faction: Faction
  totalPower: number
}
export interface WarResult {
  faction: Faction
  nbOfVictories: number
}

export enum Place {
  EARTH = 'earth',
  ANDOR = 'andor',
  SPACE = 'space',
  KASHYYK = 'Kashyyyk',
}
