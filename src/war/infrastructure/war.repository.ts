import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { EMPIRE_HACKED_TEXT, WarRepository } from '../domain'
import { people } from '../../people/infrastructure/people'
import { PeopleEntity } from '../../people/infrastructure/entities'
import { Faction } from '../../people/domain/people'
import type { BattleEntity, WarEntity } from './entities'
import { wars } from './in-memory-wars'
import { PeopleToAddToBattleDTO, PeopleToRemoveFromBattleDTO } from './dtos'

@Injectable()
export class InMemoryWarsRepository implements WarRepository {
  getWars(): WarEntity[] {
    return wars
  }

  getAWarBySlug(warSlug: string): WarEntity | undefined {
    const foundWar = wars.find(war => war.slug === warSlug)
    if (!foundWar)
      return undefined

    return foundWar
  }

  getABattleBySlug(warSlug: string, battleSlug: string): BattleEntity | undefined {
    const foundWar = wars.find(war => war.slug === warSlug)?.battles.find(battle => battleSlug === battle.slug)
    if (!foundWar)
      return undefined

    return foundWar
  }

  addPeopleToBattleHacked(warSlug: string, battleSlug: string, peopleToAddToBattle: PeopleToAddToBattleDTO): BattleEntity | undefined {
    const battle = this.getABattleBySlug(warSlug, battleSlug)
    if (!battle)
      return undefined

    const troop = battle.troops.find(troop => troop.people.slug === peopleToAddToBattle.peopleSlug)

    const people = this.getPeopleEntityFromSlug(peopleToAddToBattle.peopleSlug)
    if (!people)
      throw new HttpException('People not found', HttpStatus.NOT_FOUND)

    const numberToAdd = people?.faction === Faction.REBELLION ? peopleToAddToBattle.numberToAdd * -1 : peopleToAddToBattle.numberToAdd
    if (troop) {
      troop.number += numberToAdd
      if (!troop.slug.includes(EMPIRE_HACKED_TEXT)) {
        troop.slug += EMPIRE_HACKED_TEXT
      }
    }
    else {
      battle.troops.push({
        people,
        number: numberToAdd,
        slug: `troop-${people.kind}${EMPIRE_HACKED_TEXT}`,
      })
    }

    return battle
  }

  addPeopleToBattle(warSlug: string, battleSlug: string, peopleToAddToBattle: PeopleToAddToBattleDTO): BattleEntity | undefined {
    const battle = this.getABattleBySlug(warSlug, battleSlug)
    if (!battle)
      return undefined

    const troop = battle.troops.find(troop => troop.people.slug === peopleToAddToBattle.peopleSlug)

    if (troop) {
      troop.number += peopleToAddToBattle.numberToAdd
      if (troop.slug.includes(EMPIRE_HACKED_TEXT)) {
        troop.slug = troop.slug.replace(EMPIRE_HACKED_TEXT, '')
      }
    }
    else {
      const people = this.getPeopleEntityFromSlug(peopleToAddToBattle.peopleSlug)

      if (!people)
        throw new HttpException('People not found', HttpStatus.NOT_FOUND)

      battle.troops.push({
        people,
        number: peopleToAddToBattle.numberToAdd,
        slug: `troop-${people.kind}`,
      })
    }

    return battle
  }

  removePeopleFromBattle(warSlug: string, battleSlug: string, peopleToRemoveFromBattle: PeopleToRemoveFromBattleDTO): BattleEntity | undefined {
    const battle = this.getABattleBySlug(warSlug, battleSlug)
    if (!battle)
      return undefined

    const troopIndex = battle.troops.findIndex(troop => troop.people.slug === peopleToRemoveFromBattle.peopleSlug)

    if (troopIndex < 0)
      throw new HttpException(`No ${peopleToRemoveFromBattle.peopleSlug} to remove`, HttpStatus.NOT_FOUND)

    const troop = battle.troops[troopIndex]
    if (troop.number > 0) {
      troop.number--
      if (troop.slug.includes(EMPIRE_HACKED_TEXT)) {
        troop.slug = troop.slug.replace(EMPIRE_HACKED_TEXT, '')
      }
    }
    else {
      delete battle.troops[troopIndex]
    }

    return battle
  }

  private getPeopleEntityFromSlug(slug: string): PeopleEntity | undefined {
    return people.find(currentPeople => currentPeople.slug === slug)
  }
}
