import { Place } from '../domain'
import {
  empireDroid,
  empireSoldier,
  imperialOfficer,
  jedi,
  jediMaster,
  rebellionSoldier,
  sithLord,
  stormTrooper,
  wookie,
} from '../../people/infrastructure/people'
import type { BattleEntity, WarEntity } from './entities'

const deathStarBattle: BattleEntity = {
  slug: 'conquest-for-the-death-star-1',
  name: `Conquête de l'étoile de la mort`,
  location: { slug: 'death-star', name: 'Death Star', place: Place.SPACE },
  troops: [
    { slug: 'troop-1', people: jedi, number: 5 },
    { slug: 'troop-2', people: stormTrooper, number: 25 },
  ],
}

const andorBattle: BattleEntity = {
  slug: 'andor-battle-1',
  name: 'Piège sur la planète Andor',
  location: { slug: 'andor', name: 'Andor planet', place: Place.ANDOR, coordinates: { x: 50.234, y: -18.56 } },
  troops: [
    { slug: 'troop-1', people: sithLord, number: 2 },
    { slug: 'troop-2', people: empireDroid, number: 2 },
    { slug: 'troop-3', people: rebellionSoldier, number: 50 },
  ],
}

const kashyyykBattle: BattleEntity = {
  slug: 'kashyyyk-battle-1',
  name: 'Envahisseurs à Kashyyyk',
  location: { slug: 'kashyyyk', name: 'Planète Kashyyyk', place: Place.KASHYYK, coordinates: { x: 29.234, y: -88.56 } },
  troops: [
    { slug: 'troop-1', people: empireSoldier, number: 200 },
    { slug: 'troop-2', people: imperialOfficer, number: 10 },
    { slug: 'troop-3', people: jediMaster, number: 1 },
    { slug: 'troop-4', people: wookie, number: 50 },
  ],
}

const clientApiWar: WarEntity = {
  slug: 'client-api-war',
  name: 'La guerre des clients APIS',
  battles: [deathStarBattle, andorBattle, kashyyykBattle],
  description: `Une guerre sans merci qui opposent l'empire à la rébellion, revendiquant chacune leur meilleur client d\'API.`,
}

export const wars: WarEntity[] = [
  clientApiWar,
]
