import {WarEntity} from "../infrastructure/entities";

export interface WarRepository {
    getAWarBySlug(slug: string): WarEntity | undefined

    getWars(): WarEntity[]
}

export const WarRepository = Symbol("WarRepository")