import { Injectable } from '@nestjs/common'
import type { WarRepository } from '../domain'
import { people } from '../../people/infrastructure/people'
import type { BattleEntity, TroopEntity, WarEntity } from './entities'
import { wars } from './in-memory-wars'

@Injectable()
export class InMemoryWarsRepository implements WarRepository {
  getWars(): WarEntity[] {
    return wars
  }

  getAWarBySlug(warSlug: string): WarEntity | undefined {
    const foundWar = wars.find(war => war.slug === warSlug)
    if (!foundWar)
      return undefined

    return {
      ...foundWar,
      battles: this.mapBattles(foundWar.battles),
    }
  }

  getABattleBySlug(warSlug: string, battleSlug: string): BattleEntity | undefined {
    const foundWar = wars.find(war => war.slug === warSlug)?.battles.find(battle => battleSlug === battle.slug)
    if (!foundWar)
      return undefined

    return {
      ...foundWar,
      troops: this.mapTroops(foundWar.troops),
    }
  }

  private mapTroops(troops: TroopEntity[]) {
    return troops.map(troop => ({
      ...troop,
      people: people.find(currentPeople => currentPeople.slug === troop.people.slug)!,
    }))
  }

  private mapBattles(battles: BattleEntity[]) {
    return battles.map(battle => ({ ...battle, troops: this.mapTroops(battle.troops) }))
  }
}
