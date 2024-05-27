import {Controller, Get, HttpException, HttpStatus, Inject, Param} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {WarRepository} from "../../domain";
import {BattlePresenter, BattleSummupPresenter, WarPresenter} from "../presenters/war-presenter";
import {toBattlePresenter, toBattleSummupPresenter, toWarPresenter} from "../presenters/to-war-presenter";

@ApiTags('wars')
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
        if(!war) throw new HttpException('No war was found with the given slug', HttpStatus.NOT_FOUND)

        return toWarPresenter(war)
    }

    @Get('/:warSlug/:battleSlug')
    getABattleBySlug(@Param('warSlug') warSlug: string, @Param('battleSlug') battleSlug: string): BattlePresenter | undefined {
        const battle = this.warRepository.getABattleBySlug(warSlug, battleSlug)
        if(!battle) throw new HttpException('No battle was found with the given slug', HttpStatus.NOT_FOUND)

        return toBattlePresenter(battle)
    }

    @Get('/:warSlug/:battleSlug/summary')
    getABattleSummary(@Param('warSlug') warSlug: string, @Param('battleSlug') battleSlug: string): BattleSummupPresenter | undefined {
        const battleSummup = this.warRepository.getABattleBySlug(warSlug, battleSlug)
        if(!battleSummup) throw new HttpException('No battle was found with the given slug', HttpStatus.NOT_FOUND)

        return toBattleSummupPresenter(battleSummup)
    }
}
