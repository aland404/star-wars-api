import type { LocationEntity, TroopEntity } from '../infrastructure/entities'
import type { People } from '../../people/domain/people'
import { Faction, Kind } from '../../people/domain/people'
import { getBattleResults } from './get-battle-results'

describe('uNIT | getBattleResults', () => {
  describe('with no troop', () => {
    it('should return undefined', () => {
      const battle = getBattleEntity([])

      const battleResults = getBattleResults(battle)

      expect(battleResults).toEqual(undefined)
    })
  })

  describe('with one troop', () => {
    it('should return the one troop as winner and no loser', () => {
      const troop: TroopEntity = {
        slug: '',
        number: 10,
        people: {
          power: 15,
          faction: Faction.REBELLION,
        } as People,
      }
      const battle = getBattleEntity([troop])

      const battleResults = getBattleResults(battle)

      expect(battleResults).toEqual({
        winner: {
          faction: Faction.REBELLION,
          totalPower: 150,
        },
      })
    })
  })
  describe('with several troops', () => {
    it('empire should win and rebellion loose', () => {
      const rebellionTroop1: TroopEntity = {
        number: 10,
        people: { power: 15, faction: Faction.REBELLION } as People,
      } as TroopEntity
      const empireTroop1: TroopEntity = {
        number: 6,
        people: { power: 10, faction: Faction.EMPIRE } as People,
      } as TroopEntity
      const empireTroop2: TroopEntity = {
        number: 1,
        people: { power: 100, faction: Faction.EMPIRE } as People,
      } as TroopEntity

      const battle = getBattleEntity([empireTroop1, rebellionTroop1, empireTroop2])

      const battleResults = getBattleResults(battle)

      expect(battleResults).toEqual({
        winner: {
          faction: Faction.EMPIRE,
          totalPower: 160,
        },
        loser: {
          faction: Faction.REBELLION,
          totalPower: 150,
        },
      })
    })

    it('empire should loose and rebellion win', () => {
      const battle = getBattleEntity([
        {
          slug: '',
          people: {
            slug: 'sith-lord',
            kind: Kind.SITH_LORD,
            faction: Faction.EMPIRE,
            power: 200,
          },
          number: 2,
        },
        {
          slug: '',
          people: {
            slug: 'empire-droid',
            kind: Kind.DROID,
            faction: Faction.EMPIRE,
            power: 20,
          },
          number: 2,
        },
        {
          slug: '',
          people: {
            slug: 'rebellion-soldier',
            kind: Kind.SOLDIER,
            faction: Faction.REBELLION,
            power: 10,
          },
          number: 50,
        },
      ])

      const battleResults = getBattleResults(battle)

      expect(battleResults).toEqual({
        winner: {
          faction: Faction.REBELLION,
          totalPower: 500,
        },
        loser: {
          faction: Faction.EMPIRE,
          totalPower: 440,
        },
      })
    })
  })
})

function getBattleEntity(troops: TroopEntity[]) {
  return {
    slug: '',
    name: '',
    description: '',
    location: {} as LocationEntity,
    troops,
  }
}
