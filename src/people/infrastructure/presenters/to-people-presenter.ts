import {PeopleEntity} from "../entities";
import {PeoplePresenter} from "./people.presenter";

export function toPeoplePresenter(poepleEntity: PeopleEntity): PeoplePresenter {
    return {
        slug: poepleEntity.slug,
        kind: poepleEntity.kind,
        faction: poepleEntity.faction,
        power: poepleEntity.power
    }
}