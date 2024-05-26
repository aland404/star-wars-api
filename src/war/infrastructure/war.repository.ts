import {Injectable} from "@nestjs/common";
import {WarRepository} from "../domain";
import {WarEntity} from "./entities";
import {wars} from "./in-memory-wars";

@Injectable()
export class InMemoryWarsRepository implements WarRepository {
    getWars(): WarEntity[] {
        return wars
    }

    getAWarBySlug(slug: string): WarEntity | undefined {
        return wars.find(war => war.slug === slug)
    }
}
