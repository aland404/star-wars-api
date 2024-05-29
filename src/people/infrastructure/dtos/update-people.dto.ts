import {IsNumber, IsOptional, IsString} from 'class-validator';
import {Faction} from "../../domain/people";

export class UpdatePeopleDto {
    @IsString()
    @IsOptional()
    readonly faction?: Faction;

    @IsNumber()
    @IsOptional()
    readonly power?: number;
}