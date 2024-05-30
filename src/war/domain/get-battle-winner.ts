import type { BattleEntity, TroopEntity } from '../infrastructure/entities'
import type { Faction } from '../../people/domain/people'
import type { BattleResult } from './war'

type BattleResults = Record<Faction, { power: number, winner: true }>

export function getBattleWinner(battleEntity: BattleEntity): BattleResult | undefined {
  let maxPower = 0
  const battleResults = battleEntity.troops.reduce((acc: BattleResults, troop: TroopEntity) => {
    let winner = false
    const currentPower = troop.people.power + acc[troop.people.faction].power
    if (currentPower > maxPower) {
      maxPower = currentPower
      winner = true
    }
    return {
      [troop.people.faction]: {
        power: troop.people.power + acc[troop.people.faction].power,
        winner,
      },
    }
  }, {} as BattleResults)

  const winnerFaction = (Object.keys(battleResults) as Array<Faction>).find(faction => battleResults[faction].winner === true)
  if (!winnerFaction)
    return undefined

  return {
    faction: winnerFaction,
    totalPower: battleResults[winnerFaction].power,
  }
}
