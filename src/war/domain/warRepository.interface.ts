import type { BattleEntity, WarEntity } from '../infrastructure/entities'
import { PeopleToAddToBattleDTO, PeopleToRemoveFromBattleDTO } from '../infrastructure/dtos'

export interface WarRepository {
  getAWarBySlug: (slug: string) => WarEntity | undefined

  getWars: () => WarEntity[]

  getABattleBySlug: (warSlug: string, battleSlug: string) => BattleEntity | undefined

  addPeopleToBattle: (warSlug: string, battleSlug: string, peopleToAddToBattle: PeopleToAddToBattleDTO) => BattleEntity | undefined

  addPeopleToBattleHacked: (warSlug: string, battleSlug: string, peopleToAddToBattle: PeopleToAddToBattleDTO) => BattleEntity | undefined

  removePeopleFromBattle: (warSlug: string, battleSlug: string, peopleToRemoveFromBattle: PeopleToRemoveFromBattleDTO) => BattleEntity | undefined
}

// eslint-disable-next-line ts/no-redeclare
export const WarRepository = Symbol('WarRepository')
