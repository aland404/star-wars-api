import {BattleEntity} from "../infrastructure/entities";
import {BattleResult} from "./war";
import {Faction} from "../../people/domain/people";

type BattleResults = { winner: BattleResult, loser?: BattleResult }

export function getBattleResults(battleEntity: BattleEntity): BattleResults | undefined {
    if(!battleEntity.troops.length) return undefined

    let max = 0
    let min: number | undefined = undefined
    const results =  Object.values(Faction).reduce((acc, faction: Faction) => {
        const currentFaction = battleEntity.troops
            .filter(troop => troop.people.faction === faction)
        if(!currentFaction.length) return acc

        const powerOfCurrentFaction = currentFaction.reduce((acc, troop) => {
                return acc + (troop.people.power * troop.number)
            }, 0)

        max = Math.max(powerOfCurrentFaction, max)
        const isMax = max === powerOfCurrentFaction
        min = !min ? powerOfCurrentFaction : Math.min(powerOfCurrentFaction, min)
        let isMin =  !min || min === powerOfCurrentFaction

        return {
            winner: isMax ? { faction, totalPower: powerOfCurrentFaction } : acc.winner,
            loser: isMin ? { faction, totalPower: powerOfCurrentFaction } : acc.loser,
        }
    }, {} as BattleResults)

    return {
        winner: results.winner,
        loser: results.winner.faction === results.loser?.faction ? undefined : results.loser
    }
}