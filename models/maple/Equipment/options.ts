export interface ItemTotalOption {
    [key: string]: number; // ✅ allows dynamic access like totalOptions[statKey]
    str: number;
    dex: number;
    int: number;
    luk: number;
    max_hp: number;
    max_mp: number;
    attack_power: number;
    magic_power: number;
    armor: number;
    speed: number;
    jump: number;
    boss_damage: number;
    ignore_monster_armor: number;
    all_stat: number;
    damage: number;
    equipment_level_decrease: number;
    max_hp_rate: number;
    max_mp_rate: number;
}

export interface ItemBaseOption {
    [key: string]: number|number; // ✅ allows dynamic access like totalOptions[statKey]
    str: number;
    dex: number;
    int: number;
    luk: number;
    max_hp: number;
    max_mp: number;
    attack_power: number;
    magic_power: number;
    armor: number;
    speed: number;
    jump: number;
    boss_damage: number;
    ignore_monster_armor: number;
    all_stat: number;
    max_hp_rate: number;
    max_mp_rate: number;
    base_equipment_level: number;
}

export interface ItemExceptionalOption {
    [key: string]: number; // ✅ allows dynamic access like totalOptions[statKey]
    str: number;
    dex: number;
    int: number;
    luk: number;
    max_hp: number;
    max_mp: number;
    attack_power: number;
    magic_power: number;
    exceptional_upgrade: number;
}

export interface ItemAddOption {
    [key: string]: number; // ✅ allows dynamic access like totalOptions[statKey]
    str: number;
    dex: number;
    int: number;
    luk: number;
    max_hp: number;
    max_mp: number;
    attack_power: number;
    magic_power: number;
    armor: number;
    speed: number;
    jump: number;
    boss_damage: number;
    damage: number;
    all_stat: number;
    equipment_level_decrease: number;
}


export interface ItemEtcOption {
    [key: string]: number; // ✅ allows dynamic access like totalOptions[statKey]
    str: number,
    dex: number,
    int: number,
    luk: number,
    max_hp: number,
    max_mp: number,
    attack_power: number,
    magic_power: number,
    armor: number,
    speed: number,
    jump: number
}

export interface ItemStarForceOption {
    [key: string]: number; // ✅ allows dynamic access like totalOptions[statKey]
    str: number;
    dex: number;
    int: number;
    luk: number;
    max_hp: number;
    max_mp: number;
    attack_power: number;
    magic_power: number;
    armor: number;
    speed: number;
    jump: number;
}