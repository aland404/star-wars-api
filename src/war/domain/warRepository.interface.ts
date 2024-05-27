import {BattleEntity, WarEntity} from "../infrastructure/entities";

export interface WarRepository {
    getAWarBySlug(slug: string): WarEntity | undefined

    getWars(): WarEntity[]

    getABattleBySlug(warSlug: string, battleSlug: string): BattleEntity | undefined;
}

export const WarRepository = Symbol("WarRepository")