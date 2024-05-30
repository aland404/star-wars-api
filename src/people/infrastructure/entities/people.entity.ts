import type { Faction, Kind } from '../../domain/people'

export interface PeopleEntity {
  slug: string
  kind: Kind
  power: number
  faction: Faction
}
