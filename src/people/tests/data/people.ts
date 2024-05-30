import type { People } from '../../domain/people'
import { Faction, Kind } from '../../domain/people'

const chewbacca: People = {
  slug: 'chewbacca',
  kind: Kind.WOOKIE,
  faction: Faction.REBELLION,
  power: 50,
}

const darthVader: People = {
  slug: 'darth-vader',
  kind: Kind.SITH,
  faction: Faction.EMPIRE,
  power: 100,
}

const lukeSkywalker: People = {
  slug: 'luke-skywalker',
  kind: Kind.JEDI_MASTER,
  faction: Faction.REBELLION,
  power: 200,
}

const unexistingJediMaster: People = {
  slug: 'unexisting-people',
  kind: Kind.JEDI_MASTER,
  faction: Faction.REBELLION,
  power: 200,
}
const jedis = [chewbacca, lukeSkywalker]
export const peopleForTest = {
  chewbacca,
  lukeSkywalker,
  unexistingPeople: unexistingJediMaster,
  jedis,
  aMixOfDifferentKindOfPeople: [...jedis, darthVader],
}
