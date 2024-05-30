import {WarEntity} from "../infrastructure/entities";
import {WarResult} from "./war";
import {getBattleResults} from "./get-battle-results";
import {Faction} from "../../people/domain/people";

type WarResults = { winner: WarResult, loser: WarResult }

export function getWarResults(warEntity: WarEntity): WarResults | undefined {
    if(!warEntity.battles.length) return undefined

    let rebellionNbOfVictories = 0

    warEntity.battles.forEach(battle => {
        const battleResults = getBattleResults(battle)
        if (!battleResults) return undefined

        if(battleResults.winner.faction === Faction.REBELLION) rebellionNbOfVictories++
    })

    const nbOfBattles = warEntity.battles.length
    const victoriousFaction = (rebellionNbOfVictories / nbOfBattles)  > 1/2 ? Faction.REBELLION : Faction.EMPIRE

    return {
        loser: {
            faction: victoriousFaction === Faction.REBELLION ? Faction.EMPIRE : Faction.REBELLION,
            nbOfVictories: victoriousFaction === Faction.REBELLION ? (nbOfBattles - rebellionNbOfVictories) : rebellionNbOfVictories
        },
        winner: {
            faction: victoriousFaction,
            nbOfVictories: victoriousFaction === Faction.REBELLION ? rebellionNbOfVictories : (nbOfBattles - rebellionNbOfVictories)
        }
    }
}