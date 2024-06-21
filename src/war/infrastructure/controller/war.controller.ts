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
import type { BattlePresenter, BattleSummupPresenter, WarPresenter, WarSummaryPresenter } from '../presenters/war-presenter'
import {
  toBattlePresenter,
  toBattlePresenterHacked,
  toBattleSummaryPresenter,
  toWarPresenter,
  toWarSummaryPresenter,
} from '../presenters/to-war-presenter'
import { PeopleToAddToBattleDTO, PeopleToRemoveFromBattleDTO } from '../dtos'
import { wookie } from '../../../people/infrastructure/people'

@ApiTags('war')
@Controller('wars')
export class WarController {
  constructor(@Inject(WarRepository) private readonly warRepository: WarRepository) {
  }

  @Get('/')
  getWars(): WarPresenter[] {
    return this.warRepository.getWars().map(war => toWarPresenter(war))
  }

  @Get('/:warSlug')
  getAWarBySlug(@Param('warSlug') warSlug: string): WarPresenter | undefined {
    const war = this.warRepository.getAWarBySlug(warSlug)
    if (!war)
      throw new HttpException('No war was found with the given slug', HttpStatus.NOT_FOUND)

    return toWarPresenter(war)
  }

  @Get('/:warSlug/summary')
  getAWarSummaryBySlug(@Param('warSlug') warSlug: string): WarSummaryPresenter | undefined {
    const war = this.warRepository.getAWarBySlug(warSlug)
    if (!war)
      throw new HttpException('No war was found with the given slug', HttpStatus.NOT_FOUND)

    return toWarSummaryPresenter(war)
  }

  @Get('/:warSlug/battles/:battleSlug')
  getABattleBySlug(@Param('warSlug') warSlug: string, @Param('battleSlug') battleSlug: string): BattlePresenter | undefined {
    const battle = this.warRepository.getABattleBySlug(warSlug, battleSlug)
    if (!battle)
      throw new HttpException('No battle was found with the given slug', HttpStatus.NOT_FOUND)

    return toBattlePresenter(battle)
  }

  @Get('/:warSlug/battles/:battleSlug/summary')
  getABattleSummary(@Param('warSlug') warSlug: string, @Param('battleSlug') battleSlug: string): BattleSummupPresenter | undefined {
    const battleSummup = this.warRepository.getABattleBySlug(warSlug, battleSlug)
    if (!battleSummup)
      throw new HttpException('No battle was found with the given slug', HttpStatus.NOT_FOUND)

    return toBattleSummaryPresenter(battleSummup)
  }

  @Version('2')
  @Post('/:warSlug/battles/:battleSlug/add-people')
  addPeopleToBattleV2Hacked(@Param('warSlug') warSlug: string, @Param('battleSlug') battleSlug: string, @Body() peopleToAddToBattle: PeopleToAddToBattleDTO): BattlePresenter {
    const battle = this.warRepository.addPeopleToBattleHacked(warSlug, battleSlug, peopleToAddToBattle)
    if (!battle)
      throw new HttpException('No battle was found with the given slug', HttpStatus.NOT_FOUND)

    return toBattlePresenterHacked(battle)
  }

  @Version('3')
  @Post('/:warSlug/battles/:battleSlug/add-people')
  addPeopleToBattleV3(@Param('warSlug') warSlug: string, @Param('battleSlug') battleSlug: string, @Body() peopleToAddToBattle: PeopleToAddToBattleDTO): BattlePresenter {
    const battle = this.warRepository.addPeopleToBattle(warSlug, battleSlug, peopleToAddToBattle)
    if (!battle)
      throw new HttpException('No battle was found with the given slug', HttpStatus.NOT_FOUND)

    return toBattlePresenter(battle)
  }

  @Version('4')
  @Post('/:warSlug/battles/:battleSlug/add-people')
  addPeopleToBattleV4Hacked(@Param('warSlug') warSlug: string, @Param('battleSlug') battleSlug: string, @Body() peopleToAddToBattle: PeopleToAddToBattleDTO): BattlePresenter {
    const battle = this.warRepository.addPeopleToBattleHacked(warSlug, battleSlug, peopleToAddToBattle)
    if (!battle)
      throw new HttpException('No battle was found with the given slug', HttpStatus.NOT_FOUND)

    return toBattlePresenterHacked(battle)
  }

  @HttpCode(666)
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
