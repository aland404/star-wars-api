import { HttpException, HttpStatus } from '@nestjs/common'
import type { BattleEntity, LocationEntity, TroopEntity, WarEntity } from '../entities'
import { getBattleResults } from '../../domain/get-battle-results'
import { getWarResults } from '../../domain/get-war-results'
import { EMPIRE_HACKED_TEXT } from '../../domain'
import { Faction } from '../../../people/domain/people'
import type {
  BattlePresenter,
  BattleSummupPresenter,
  LocationPresenter,
  TroopPresenter,
  WarPresenter,
  WarSummaryPresenter,
  WarsPresenter,
  WarsSummaryPresenter,
} from './war-presenter'

function toTroopPresenter(troopEntity: TroopEntity): TroopPresenter {
  return {
    slug: troopEntity.slug.replace(EMPIRE_HACKED_TEXT, ''),
    people: troopEntity.people,
    number: troopEntity.number,
  }
}

function toTroopPresenterHacked(troopEntity: TroopEntity): TroopPresenter {
  return {
    slug: troopEntity.slug,
    people: troopEntity.people,
    number: troopEntity.number,
  }
}

function toLocationPresenter(locationEntity: LocationEntity): LocationPresenter {
  return {
    name: locationEntity.name,
    place: locationEntity.place,
    coordinates: locationEntity.coordinates,
  }
}

export function toBattlePresenter(battleEntity: BattleEntity): BattlePresenter {
  return {
    slug: battleEntity.slug,
    name: battleEntity.name,
    description: battleEntity.description,
    location: toLocationPresenter(battleEntity.location),
    troops: battleEntity.troops.map(troop => toTroopPresenter(troop)),
  }
}

export function toBattlePresenterHacked(battleEntity: BattleEntity): BattlePresenter {
  return {
    slug: battleEntity.slug,
    name: battleEntity.name,
    description: battleEntity.description,
    location: toLocationPresenter(battleEntity.location),
    troops: battleEntity.troops.map(troop => toTroopPresenterHacked(troop)),
  }
}

export function toBattleSummaryPresenter(battleEntity: BattleEntity): BattleSummupPresenter {
  const battleResults = getBattleResults(battleEntity)
  return {
    name: battleEntity.name,
    loser: battleResults?.loser,
    winner: battleResults?.winner,
  }
}

export function toWarsPresenter(warsEntity: WarEntity[]): WarsPresenter {
  return {
    wars: warsEntity.map(war => toWarPresenter(war)),
    summary: toWarsSummaryPresenter(warsEntity),
  }
}

export function toWarsSummaryPresenter(warsEntity: WarEntity[]): WarsSummaryPresenter {
  const isEmpireWinningAtLeastOneWar = warsEntity.some((war) => {
    const warResult = getWarResults(war)
    return warResult?.winner.faction === Faction.EMPIRE
  })

  return {
    winner: isEmpireWinningAtLeastOneWar ? Faction.EMPIRE : Faction.REBELLION,
    loser: isEmpireWinningAtLeastOneWar ? Faction.REBELLION : Faction.EMPIRE,
  }
}

export function toWarPresenter(warEntity: WarEntity): WarPresenter {
  return {
    slug: warEntity.slug,
    name: warEntity.name,
    description: warEntity.description,
    battles: warEntity.battles.map(battle => toBattlePresenter(battle)),
    currentDate: getCurrentDateFormatted(),
  }
}

export function toWarSummaryPresenter(warEntity: WarEntity): WarSummaryPresenter {
  const warResults = getWarResults(warEntity)
  if (!warResults)
    throw new HttpException('No battle found for this war: no battle, no winner', HttpStatus.NOT_FOUND)

  return {
    name: warEntity.name,
    description: warEntity.description,
    loser: warResults.loser,
    winner: warResults.winner,
  }
}

function getCurrentDateFormatted() {
  const today = new Date()
  const day = String(today.getDate()).padStart(2, '0')
  const month = String(today.getMonth() + 1).padStart(2, '0') // Les mois commencent à 0
  const year = today.getFullYear()

  return `${day}/${month}/${year}`
}
