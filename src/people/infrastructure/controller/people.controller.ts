import {Body, Controller, Delete, Get, Inject, Param, Post, Put, Query} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {People} from "../../domain/people";
import {PeopleRepository} from "../../domain/peopleRepository.interface";
import {CreatePeopleDto, UpdatePeopleDto} from "../dtos";
import {GetPeopleQuery} from "../queries/GetPeopleQuery";

@ApiTags('people')
@Controller('people')
export class PeopleController {
    constructor(@Inject(PeopleRepository) private readonly peopleRepository: PeopleRepository) {
    }

    @Get('/')
    getPeople(@Query() queries?: GetPeopleQuery): People[] {
        return this.peopleRepository.getPeople(queries?.faction)
    }

    @Delete('/:peopleSlug')
    deletePeopleBySlug(@Param('peopleSlug') peopleSlug: string): string {
        return this.peopleRepository.deleteAPeopleBySug(peopleSlug)
    }

    @Get('/:peopleSlug')
    getAPeopleBySlug(@Param('peopleSlug') peopleSlug: string): People | undefined {
        return this.peopleRepository.getAPeopleBySlug(peopleSlug)
    }


    @Post('/')
    createAPeople(@Body() peopleToCreate: CreatePeopleDto): People {
        return this.peopleRepository.createAPeople(peopleToCreate);
    }


    @Put('/:peopleSlug')
    updateAPeople(@Param('peopleSlug') peopleSlug: string, @Body() peopleToUpdate: UpdatePeopleDto): People {
        return this.peopleRepository.updateAPeople(peopleSlug, peopleToUpdate);
    }
}
