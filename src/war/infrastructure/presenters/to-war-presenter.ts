import {BattlePresenter, BattleSummupPresenter, LocationPresenter, TroopPresenter, WarPresenter} from "./war-presenter";
import {BattleEntity, LocationEntity, TroopEntity, WarEntity} from "../entities";
import {getBattleWinner} from "../../domain/get-battle-winner";
import {getBattleResults} from "../../domain/get-battle-results";

function toTroopPresenter(troopEntity: TroopEntity): TroopPresenter {
    return {
        people: troopEntity.people,
        number: troopEntity.number
    }
}

function toLocationPresenter(locationEntity: LocationEntity): LocationPresenter {
    return {
        name: locationEntity.name,
        place: locationEntity.place,
        coordinates: locationEntity.coordinates
    };
}

export function toBattlePresenter(battleEntity: BattleEntity): BattlePresenter {
    return {
        slug: battleEntity.slug,
        name: battleEntity.name,
        description: battleEntity.description,
        location: toLocationPresenter(battleEntity.location),
        troops: battleEntity.troops.map(troop => toTroopPresenter(troop))
    };
}

export function toBattleSummupPresenter(battleEntity: BattleEntity): BattleSummupPresenter {
    const battleResults = getBattleResults(battleEntity)
    return {
        name: battleEntity.name,
        loser: battleResults?.loser,
        winner: battleResults?.winner
    }
}

export function toWarPresenter(warEntity: WarEntity): WarPresenter {
    return {
        slug: warEntity.slug,
        name: warEntity.name,
        description: warEntity.description,
        battles: warEntity.battles.map(battle => toBattlePresenter(battle))
    }
}