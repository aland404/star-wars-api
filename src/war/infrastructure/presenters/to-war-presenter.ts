import {BattlePresenter, LocationPresenter, TroopPresenter, WarPresenter} from "./war-presenter";
import {BattleEntity, LocationEntity, TroopEntity, WarEntity} from "../entities";

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

function toBattlePresenter(battleEntity: BattleEntity): BattlePresenter {
    return {
        name: battleEntity.name,
        description: battleEntity.description,
        location: toLocationPresenter(battleEntity.location),
        troops: battleEntity.troops.map(troop => toTroopPresenter(troop))
    };
}

export function toWarPresenter(warEntity: WarEntity): WarPresenter {
    return {
        slug: warEntity.slug,
        name: warEntity.name,
        description: warEntity.description,
        battles: warEntity.battles.map(battle => toBattlePresenter(battle))
    }
}