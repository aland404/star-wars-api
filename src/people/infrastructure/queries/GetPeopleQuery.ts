import {Faction} from "../../domain/people";
import {IsEnum, IsOptional} from "class-validator";

export class GetPeopleQuery{
    @IsEnum(Faction)
    @IsOptional()
    faction?: Faction;
}