export type People = {
    slug: string,
    kind: Kind,
    power: number,
    faction: Faction
}

export enum Faction {
    EMPIRE = 'empire',
    REBELLION = 'rebellion',
    NONE = 'none'
}

export enum Kind {
    SITH= 'sith',
    SITH_LORD= 'sith-lord',
    JEDI='jedi',
    JEDI_MASTER='jedi-master',
    WOOKIE='wookie',
    IMPERIAL_OFFICER='imperial_officer',
    BOUNTY_HUNTER='bounty_hunter',
    STORM_TROOPER='storm_trooper',
    SOLDIER='soldier',
    DROID='droid'
}