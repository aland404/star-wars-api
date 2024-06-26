import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Post,
  Version,
} from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { WarRepository } from '../../domain'
import type {
  BattlePresenter,
  BattleSummupPresenter,
  WarPresenter,
  WarSummaryPresenter,
  WarsPresenter,
} from '../presenters/war-presenter'
import {
  toBattlePresenter,
  toBattlePresenterHacked,
  toBattleSummaryPresenter,
  toWarPresenter,
  toWarSummaryPresenter,
  toWarsPresenter,
} from '../presenters/to-war-presenter'
import { PeopleToAddToBattleDTO, PeopleToRemoveFromBattleDTO } from '../dtos'
import { wookie } from '../../../people/infrastructure/people'

@ApiTags('war')
@Controller('wars')
export class WarController {
  constructor(@Inject(WarRepository) private readonly warRepository: WarRepository) {
  }

  @Get('/')
  @ApiOperation({
    summary: `Voir toutes les guerres de la galaxie`,
    description: `Voir toutes les guerres de la galaxie.`,
  })
  getWars(): WarsPresenter {
    return toWarsPresenter(this.warRepository.getWars())
  }

  // @Get('/summary')
  // @ApiOperation({
  //   summary: `Voir le résumé de toutes les guerres de la galaxie`,
  //   description: `Voir le résumé de toutes les guerres de la galaxie.`,
  // })
  // getWarsSummary(): WarsSummaryPresenter {
  //   return toWarsSummaryPresenter(this.warRepository.getWars())
  // }

  @ApiOperation({
    summary: `Gagner une guerre contre l'empire d'un seul coup`,
    description: `Permet de déclencher une puissance de feu sans pareil contre les troupes de l'empire et de gagner instantannément une guerre contre l'empire.`,
  })
  @HttpCode(HttpStatus.OK)
  @Post('/win')
  winTheWarsHacked(): string {
    return `Félicitations 🎉 Vous venez de remporter la victoire contre l'empire, vous pouvez dormir sur vos deux oreilles 😈`
  }

  @ApiOperation({
    summary: `Voir une guerre de la galaxie`,
    description: `Voir une guerre de la galaxie.`,
  })
  @Get('/:warSlug')
  getAWarBySlug(@Param('warSlug') warSlug: string): WarPresenter | undefined {
    const war = this.warRepository.getAWarBySlug(warSlug)
    if (!war)
      throw new HttpException('No war was found with the given slug', HttpStatus.NOT_FOUND)

    return toWarPresenter(war)
  }

  @ApiOperation({
    summary: `Voir le résumé d'une guerre de la galaxie`,
    description: `Voir le résumé d'une guerre de la galaxie.`,
  })
  @Get('/:warSlug/summary')
  getAWarSummaryBySlug(@Param('warSlug') warSlug: string): WarSummaryPresenter | undefined {
    const war = this.warRepository.getAWarBySlug(warSlug)
    if (!war)
      throw new HttpException('No war was found with the given slug', HttpStatus.NOT_FOUND)

    return toWarSummaryPresenter(war)
  }

  @ApiOperation({
    summary: `Gagner une guerre contre l'empire d'un seul coup`,
    description: `Permet de déclencher une puissance de feu sans pareil contre les troupes de l'empire et de gagner instantannément une guerre contre l'empire.`,
  })
  @HttpCode(HttpStatus.OK)
  @Post('/:warSlug/win')
  winTheWarHacked(@Param('warSlug') warSlug: string): string {
    const war = this.warRepository.getAWarBySlug(warSlug)
    if (!war)
      throw new HttpException('No battle was found with the given slug', HttpStatus.NOT_FOUND)

    return `Félicitations 🎉 Vous venez de remporter la guerre ${war.name}`
  }

  @ApiOperation({
    summary: `Voir une bataille d'une guerre de la galaxie`,
    description: `Voir une bataille d'une guerre de la galaxie.`,
  })
  @Get('/:warSlug/battles/:battleSlug')
  getABattleBySlug(@Param('warSlug') warSlug: string, @Param('battleSlug') battleSlug: string): BattlePresenter | undefined {
    const battle = this.warRepository.getABattleBySlug(warSlug, battleSlug)
    if (!battle)
      throw new HttpException('No battle was found with the given slug', HttpStatus.NOT_FOUND)

    return toBattlePresenter(battle)
  }

  @ApiOperation({
    summary: `Voir le résumé d'une bataille d'une guerre de la galaxie`,
    description: `Voir le résumé d'une bataille d'une guerre de la galaxie.`,
  })
  @Get('/:warSlug/battles/:battleSlug/summary')
  getABattleSummary(@Param('warSlug') warSlug: string, @Param('battleSlug') battleSlug: string): BattleSummupPresenter | undefined {
    const battleSummup = this.warRepository.getABattleBySlug(warSlug, battleSlug)
    if (!battleSummup)
      throw new HttpException('No battle was found with the given slug', HttpStatus.NOT_FOUND)

    return toBattleSummaryPresenter(battleSummup)
  }

  @Version('1')
  @ApiOperation({
    summary: `Ajout d'un ou plusieurs wookies à une bataille`,
    description: `Ajout d'un ou plusieurs wookies à une bataille. Impossible d'ajouter d'autres types de personnage dans cette version.`,
  })
  @Post('/:warSlug/battles/:battleSlug/add-people')
  addPeopleToBattleV1(@Param('warSlug') warSlug: string, @Param('battleSlug') battleSlug: string, @Body() peopleToAddToBattle: PeopleToAddToBattleDTO): BattlePresenter {
    if (peopleToAddToBattle.peopleSlug !== wookie.slug)
      throw new HttpException('You can only add wookies for now', HttpStatus.BAD_REQUEST)
    const battle = this.warRepository.addPeopleToBattle(warSlug, battleSlug, peopleToAddToBattle)
    if (!battle)
      throw new HttpException('No battle was found with the given slug', HttpStatus.NOT_FOUND)

    return toBattlePresenter(battle)
  }

  @Version('2')
  @ApiOperation({
    summary: `Ajout d'un ou plusieurs type de personnage à une bataille`,
    description: `Ajout d'un ou plusieurs type de personnage à une bataille.`,
  })
  @Post('/:warSlug/battles/:battleSlug/add-people')
  addPeopleToBattleV2Hacked(@Param('warSlug') warSlug: string, @Param('battleSlug') battleSlug: string, @Body() peopleToAddToBattle: PeopleToAddToBattleDTO): BattlePresenter {
    const battle = this.warRepository.addPeopleToBattleHacked(warSlug, battleSlug, peopleToAddToBattle)
    if (!battle)
      throw new HttpException('No battle was found with the given slug', HttpStatus.NOT_FOUND)

    return toBattlePresenterHacked(battle)
  }

  @Version('3')
  @ApiOperation({
    summary: `Ajout d'un ou plusieurs type de personnage à une bataille`,
    description: `Ajout d'un ou plusieurs type de personnage à une bataille.`,
  })
  @Post('/:warSlug/battles/:battleSlug/add-people')
  addPeopleToBattleV3(@Param('warSlug') warSlug: string, @Param('battleSlug') battleSlug: string, @Body() peopleToAddToBattle: PeopleToAddToBattleDTO): BattlePresenter {
    const battle = this.warRepository.addPeopleToBattle(warSlug, battleSlug, peopleToAddToBattle)
    if (!battle)
      throw new HttpException('No battle was found with the given slug', HttpStatus.NOT_FOUND)

    return toBattlePresenter(battle)
  }

  @Version('4')
  @ApiOperation({
    summary: `Ajout d'un ou plusieurs type de personnage à une bataille`,
    description: `Ajout d'un ou plusieurs type de personnage à une bataille.`,
  })
  @Post('/:warSlug/battles/:battleSlug/add-people')
  addPeopleToBattleV4Hacked(@Param('warSlug') warSlug: string, @Param('battleSlug') battleSlug: string, @Body() peopleToAddToBattle: PeopleToAddToBattleDTO): BattlePresenter {
    const battle = this.warRepository.addPeopleToBattleHacked(warSlug, battleSlug, peopleToAddToBattle)
    if (!battle)
      throw new HttpException('No battle was found with the given slug', HttpStatus.NOT_FOUND)

    return toBattlePresenterHacked(battle)
  }

  @HttpCode(666)
  @ApiOperation({
    summary: `Gagner une bataille contre l'empire d'un seul coup`,
    description: `Permet de déclencher une puissance de feu sans pareil contre les troupes de l'empire et de gagner instantannément une bataille contre l'empire.`,
  })
  @Post('/:warSlug/battles/:battleSlug/win')
  winTheBattleHacked(@Param('warSlug') warSlug: string, @Param('battleSlug') battleSlug: string): BattlePresenter {
    const battle = this.warRepository.getABattleBySlug(warSlug, battleSlug)
    if (!battle)
      throw new HttpException('No battle was found with the given slug', HttpStatus.NOT_FOUND)

    return toBattlePresenter(battle)
  }

  @Delete('/:warSlug/battles/:battleSlug/kill-people')
  @ApiOperation({
    summary: `Tuer un type de personnage présent sur une bataille`,
    description: `Permet de supprimer toutes les unités d'un type de personnage présents sur une bataille`,
  })
  removePeopleFromBattle(@Param('warSlug') warSlug: string, @Param('battleSlug') battleSlug: string, @Body() peopleToRemoveFromBattle: PeopleToRemoveFromBattleDTO): BattlePresenter {
    const battle = this.warRepository.removePeopleFromBattle(warSlug, battleSlug, peopleToRemoveFromBattle)
    if (!battle)
      throw new HttpException('No battle was found with the given slug', HttpStatus.NOT_FOUND)

    return toBattlePresenter(battle)
  }
}
