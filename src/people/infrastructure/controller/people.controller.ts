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
  Put,
  Query,
} from '@nestjs/common'
import { ApiQuery, ApiTags } from '@nestjs/swagger'
import { Faction } from '../../domain/people'
import { PeopleRepository } from '../../domain/peopleRepository.interface'
import { CreatePeopleDto, UpdatePeopleDto } from '../dtos'
import { GetPeopleQuery } from '../queries/GetPeopleQuery'
import { PeoplePresenter } from '../presenters/people.presenter'
import { toPeoplePresenter } from '../presenters/to-people-presenter'

@ApiTags('people')
@Controller('people')
export class PeopleController {
  constructor(@Inject(PeopleRepository) private readonly peopleRepository: PeopleRepository) {
  }

  @HttpCode(HttpStatus.OK)
  @Get('/')
  @ApiQuery({ name: 'faction', enum: Faction, description: 'The faction of the people' })
  getPeople(@Query() queries?: GetPeopleQuery): PeoplePresenter[] {
    return this.peopleRepository.getPeople(queries?.faction).map(people => toPeoplePresenter(people))
  }

  @Delete('/:peopleSlug')
  deletePeopleBySlug(@Param('peopleSlug') peopleSlug: string): string {
    return this.peopleRepository.deleteAPeopleBySug(peopleSlug)
  }

  @Get('/:peopleSlug')
  getAPeopleBySlug(@Param('peopleSlug') peopleSlug: string): PeoplePresenter | undefined {
    const people = this.peopleRepository.getAPeopleBySlug(peopleSlug)
    if (!people)
      throw new HttpException('No people found', HttpStatus.NOT_FOUND)

    return toPeoplePresenter(people)
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('/')
  createAPeople(@Body() peopleToCreate: CreatePeopleDto): PeoplePresenter {
    return toPeoplePresenter(this.peopleRepository.createAPeople(peopleToCreate))
  }

  @Put('/:peopleSlug')
  updateAPeople(@Param('peopleSlug') peopleSlug: string, @Body() peopleToUpdate: UpdatePeopleDto): PeoplePresenter {
    return toPeoplePresenter(this.peopleRepository.updateAPeople(peopleSlug, peopleToUpdate))
  }
}
