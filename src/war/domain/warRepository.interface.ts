import type { BattleEntity, WarEntity } from '../infrastructure/entities'

export interface WarRepository {
  getAWarBySlug: (slug: string) => WarEntity | undefined

  getWars: () => WarEntity[]

  getABattleBySlug: (warSlug: string, battleSlug: string) => BattleEntity | undefined
}

// eslint-disable-next-line ts/no-redeclare
export const WarRepository = Symbol('WarRepository')
