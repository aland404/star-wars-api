import {IsNotEmpty, IsNumber, IsOptional, IsString} from 'class-validator';
import {Faction, Kind} from "../../domain/people";

export class CreatePeopleDto {
    @IsString()
    @IsNotEmpty()
    readonly slug: string;

    @IsString()
    readonly kind: Kind;

    @IsString()
    readonly faction: Faction;

    @IsNumber()
    readonly power: number;
}