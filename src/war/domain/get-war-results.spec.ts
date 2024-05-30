import type { BattleEntity, TroopEntity, WarEntity } from '../infrastructure/entities'
import type { People } from '../../people/domain/people'
import { Faction } from '../../people/domain/people'
import { getWarResults } from './get-war-results'

describe('uNIT | getWarResults', () => {
  describe('with a war without battle', () => {
    it('should return undefined', () => {
      const war = getWarEntity([])

      const battleResults = getWarResults(war)

      expect(battleResults).toEqual(undefined)
    })
  })

  describe('with one victory for each side', () => {
    it('should return the empire as victorious', () => {
      const war = getWarEntity([getABattleWonByRebellion(), getABattleWonByEmpire()])

      const battleResults = getWarResults(war)

      expect(battleResults).toEqual({
        winner: {
          faction: Faction.EMPIRE,
          nbOfVictories: 1,
        },
        loser: {
          faction: Faction.REBELLION,
          nbOfVictories: 1,
        },
      })
    })
  })

  describe('with two victories for the rebellion', () => {
    it('should return the rebellion as victorious', () => {
      const war = getWarEntity([getABattleWonByRebellion(), getABattleWonByRebellion(), getABattleWonByEmpire()])

      const battleResults = getWarResults(war)

      expect(battleResults).toEqual({
        loser: {
          faction: Faction.EMPIRE,
          nbOfVictories: 1,
        },
        winner: {
          faction: Faction.REBELLION,
          nbOfVictories: 2,
        },
      })
    })
  })
})

function getWarEntity(battles: BattleEntity[]): WarEntity {
  return {
    slug: '',
    name: '',
    description: '',
    battles,
  }
}

function getEmpireTroopOfOneHundredPower(): TroopEntity {
  return {
    number: 10,
    people: { power: 10, faction: Faction.EMPIRE } as People,
  } as TroopEntity
}

function getRebellionTroopOfOneHundredPower(): TroopEntity {
  return {
    number: 10,
    people: { power: 10, faction: Faction.REBELLION } as People,
  } as TroopEntity
}

function getABattleWonByEmpire(): BattleEntity {
  return {
    troops: [getEmpireTroopOfOneHundredPower(), getEmpireTroopOfOneHundredPower(), getRebellionTroopOfOneHundredPower()],
  } as BattleEntity
}

function getABattleWonByRebellion(): BattleEntity {
  return {
    troops: [getEmpireTroopOfOneHundredPower(), getRebellionTroopOfOneHundredPower(), getRebellionTroopOfOneHundredPower()],
  } as BattleEntity
}
