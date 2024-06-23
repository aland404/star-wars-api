import {
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common'
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger'
import { Faction } from '../../domain/people'
import { PeopleRepository } from '../../domain/peopleRepository.interface'
import { GetPeopleQuery } from '../queries/GetPeopleQuery'
import { PeoplePresenter } from '../presenters/people.presenter'
import { toPeoplePresenter } from '../presenters/to-people-presenter'
import { AuthGuard } from '../../../auth/auth.guard'

@ApiTags('people')
@Controller('people')
export class PeopleController {
  constructor(@Inject(PeopleRepository) private readonly peopleRepository: PeopleRepository) {
  }

  @HttpCode(HttpStatus.OK)
  @Get('/')
  @ApiOperation({
    summary: `Voir les informations de tous les types de personnages de la galaxie - possibilité de filtrer par faction`,
    description: `Voir les informations de tous les types de personnages de la galaxie.
    Possibilité de ne voir que les personnage d'une même faction en filtrant par query.`,
  })
  @ApiQuery({ name: 'faction', enum: Faction, description: 'La faction du personnage' })
  getPeople(@Query() queries?: GetPeopleQuery): PeoplePresenter[] {
    return this.peopleRepository.getPeople(queries?.faction).map(people => toPeoplePresenter(people))
  }

  @ApiOperation({
    summary: `Voir les informations d'un type de personnage de la galaxie`,
    description: `Voir les informations d'un type de personnage de la galaxie.`,
  })
  @Get('/:peopleSlug')
  getAPeopleBySlug(@Param('peopleSlug') peopleSlug: string): PeoplePresenter | undefined {
    const people = this.peopleRepository.getAPeopleBySlug(peopleSlug)
    if (!people)
      throw new HttpException('No people found', HttpStatus.NOT_FOUND)

    return toPeoplePresenter(people)
  }

  // @HttpCode(HttpStatus.CREATED)
  // @Post('/')
  // createAPeople(@Body() peopleToCreate: CreatePeopleDto): PeoplePresenter {
  //   return toPeoplePresenter(this.peopleRepository.createAPeople(peopleToCreate))
  // }
  //
  // @Put('/:peopleSlug')
  // updateAPeople(@Param('peopleSlug') peopleSlug: string, @Body() peopleToUpdate: UpdatePeopleDto): PeoplePresenter {
  //   return toPeoplePresenter(this.peopleRepository.updateAPeople(peopleSlug, peopleToUpdate))
  // }
  //
  // @Delete('/:peopleSlug')
  // deletePeopleBySlug(@Param('peopleSlug') peopleSlug: string): string {
  //   return this.peopleRepository.deleteAPeopleBySug(peopleSlug)
  // }

  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: `Faire progresser un type personnage`,
    description: `Faire monter de niveau un type personnage si c'est possible pour lui, pour qu'il gagne en puissance.`,
  })
  @Post('/:peopleSlug/level-up')
  levelUpAPeople(@Param('peopleSlug') peopleSlug: string): PeoplePresenter {
    return toPeoplePresenter(this.peopleRepository.levelUpAPeople(peopleSlug))
  }
}
