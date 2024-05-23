import {Faction, Kind, People} from "../../domain/people";

const chewbacca: People = {
    slug: Kind.WOOKIE,
    kind: Kind.WOOKIE,
    faction: Faction.REBELLION,
    power: 50
}

const lukeSkywalker: People = {
    slug: Kind.JEDI_MASTER,
    kind: Kind.JEDI_MASTER,
    faction: Faction.REBELLION,
    power: 200
}

const unexistingJediMaster: People = {
    slug: 'unexisting-people',
    kind: Kind.JEDI_MASTER,
    faction: Faction.REBELLION,
    power: 200
}

export const peopleForTest = {
    chewbacca,
    lukeSkywalker,
    unexistingPeople: unexistingJediMaster,
    twoRandomPeople: [chewbacca, lukeSkywalker]
}