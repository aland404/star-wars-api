import type { Place } from '../../domain'
import type { People } from '../../../people/domain/people'

export interface WarEntity {
  slug: string
  name: string
  description?: string
  battles: BattleEntity[]
}

export interface TroopEntity {
  slug: string
  people: People
  number: number
}

export interface BattleEntity {
  slug: string
  name: string
  description?: string
  location: LocationEntity
  troops: TroopEntity[]
}

export interface LocationEntity {
  slug: string
  name: string
  place: Place
  coordinates?: { x: number, y: number }
}
