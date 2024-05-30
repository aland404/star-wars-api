import type { Faction, Kind } from '../../domain/people'

export interface PeoplePresenter {
  slug: string
  kind: Kind
  power: number
  faction: Faction
}
