import type { BattleEntity } from '../infrastructure/entities'
import { Faction } from '../../people/domain/people'
import type { BattleResult } from './war'

interface BattleResults { winner: BattleResult, loser?: BattleResult }

interface PowerByFaction { [key: string]: number }

export function getBattleResults(battleEntity: BattleEntity): BattleResults | undefined {
  if (!battleEntity.troops.length)
    return undefined

  const powerByFaction = Object.values(Faction).reduce((acc, faction: Faction) => {
    const currentFaction = battleEntity.troops
      .filter(troop => troop.people.faction === faction)
    if (!currentFaction.length)
      return acc

    const powerOfCurrentFaction = currentFaction.reduce((acc, troop) => {
      return acc + (troop.people.power * troop.number)
    }, 0)

    return {
      ...acc,
      [faction]: powerOfCurrentFaction,
    }
  }, {} as PowerByFaction)

  const isEmpireWinning = powerByFaction[Faction.EMPIRE] >= powerByFaction[Faction.REBELLION]
  return {
    winner: isEmpireWinning ? { faction: Faction.EMPIRE, totalPower: powerByFaction[Faction.EMPIRE] } : { faction: Faction.REBELLION, totalPower: powerByFaction[Faction.REBELLION] },
    loser: isEmpireWinning ? { faction: Faction.REBELLION, totalPower: powerByFaction[Faction.REBELLION] } : { faction: Faction.EMPIRE, totalPower: powerByFaction[Faction.EMPIRE] },
  }
}
