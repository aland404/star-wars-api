import type { PeopleEntity } from '../entities'
import type { PeoplePresenter } from './people.presenter'

export function toPeoplePresenter(poepleEntity: PeopleEntity): PeoplePresenter {
  return {
    slug: poepleEntity.slug,
    kind: poepleEntity.kind,
    faction: poepleEntity.faction,
    power: poepleEntity.power,
  }
}
