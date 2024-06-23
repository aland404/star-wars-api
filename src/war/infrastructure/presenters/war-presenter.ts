import { Faction, People } from '../../../people/domain/people'
import type { BattleResult, Place, WarResult } from '../../domain'

export interface WarsPresenter {
  wars: WarPresenter[]
  summary: WarsSummaryPresenter
}
export interface WarsSummaryPresenter {
  loser: Faction
  winner: Faction
}

export interface WarPresenter {
  slug: string
  name: string
  description?: string
  battles: BattlePresenter[]
  currentDate: string
}

export interface WarSummaryPresenter {
  name: string
  description?: string
  loser: WarResult
  winner: WarResult
}

export interface TroopPresenter {
  slug: string
  people: People
  number: number
}

export interface BattlePresenter {
  slug: string
  name: string
  description?: string
  location: LocationPresenter
  troops: TroopPresenter[]
}

export interface BattleSummupPresenter {
  name: string
  winner: BattleResult | undefined
  loser: BattleResult | undefined
}

export interface LocationPresenter {
  name: string
  place: Place
  coordinates?: { x: number, y: number }
}
