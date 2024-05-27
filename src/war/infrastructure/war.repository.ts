import {Injectable} from "@nestjs/common";
import {WarRepository} from "../domain";
import {BattleEntity, WarEntity} from "./entities";
import {wars} from "./in-memory-wars";

@Injectable()
export class InMemoryWarsRepository implements WarRepository {
    getWars(): WarEntity[] {
        return wars
    }

    getAWarBySlug(warSlug: string): WarEntity | undefined {
        return wars.find(war => war.slug === warSlug)
    }

    getABattleBySlug(warSlug: string, battleSlug: string): BattleEntity | undefined {
        return wars.find(war => war.slug === warSlug)?.battles.find(battle => battleSlug === battle.slug)
    }
}
