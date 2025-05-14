export interface EquipmentResponse {
    item_equipment_part: string;
    item_equipment_slot: string;
    item_name: string;
    item_icon: string;
    item_description: string;
    item_shape_name: string;
    item_shape_icon: string;
    item_gender: string;
    item_total_option: ItemTotalOptionResponse;
    item_base_option: ItemBaseOptionResponse;
    potential_option_grade: string;
    additional_potential_option_grade: string;
    potential_option_flag: string;
    potential_option_1: string;
    potential_option_2: string;
    potential_option_3: string;
    additional_potential_option_flag: string;
    additional_potential_option_1: string;
    additional_potential_option_2: string;
    additional_potential_option_3: string;
    equipment_level_increase: number;
    item_exceptional_option: ItemExceptionalOptionResponse;
    item_add_option: ItemAddOptionResponse;
    growth_exp: number;
    growth_level: number;
    scroll_upgrade: string;
    cuttable_count: string;
    golden_hammer_flag: string;
    scroll_resilience_count: string;
    scroll_upgradeable_count: string;
    soul_name: string;
    soul_option: string;
    item_etc_option: ItemEtcOptionResponse;
    starforce: string;
    starforce_scroll_flag: string;
    item_starforce_option: ItemStarForceOptionResponse;
    special_ring_level: number;
    date_expire: string;
}
export interface ItemTotalOptionResponse {
    [key: string]: string | number;
    str: string;
    dex: string;
    int: string;
    luk: string;
    max_hp: string;
    max_mp: string;
    attack_power: string;
    magic_power: string;
    armor: string;
    speed: string;
    jump: string;
    boss_damage: string;
    ignore_monster_armor: string;
    all_stat: string;
    damage: string;
    equipment_level_decrease: number;
    max_hp_rate: string;
    max_mp_rate: string;
}
export interface ItemBaseOptionResponse {
    [key: string]: string | number;
    str: string;
    dex: string;
    int: string;
    luk: string;
    max_hp: string;
    max_mp: string;
    attack_power: string;
    magic_power: string;
    armor: string;
    speed: string;
    jump: string;
    boss_damage: string;
    ignore_monster_armor: string;
    all_stat: string;
    max_hp_rate: string;
    max_mp_rate: string;
    base_equipment_level: number;
}
export interface ItemExceptionalOptionResponse {
    [key: string]: string | number;
    str: string;
    dex: string;
    int: string;
    luk: string;
    max_hp: string;
    max_mp: string;
    attack_power: string;
    magic_power: string;
    exceptional_upgrade: number;
}
export interface ItemAddOptionResponse {
    [key: string]: string | number;
    str: string;
    dex: string;
    int: string;
    luk: string;
    max_hp: string;
    max_mp: string;
    attack_power: string;
    magic_power: string;
    armor: string;
    speed: string;
    jump: string;
    boss_damage: string;
    damage: string;
    all_stat: string;
    equipment_level_decrease: number;
}
export interface ItemEtcOptionResponse {
    [key: string]: string | number;
    str: string;
    dex: string;
    int: string;
    luk: string;
    max_hp: string;
    max_mp: string;
    attack_power: string;
    magic_power: string;
    armor: string;
    speed: string;
    jump: string;
}
export interface ItemStarForceOptionResponse {
    [key: string]: string;
    str: string;
    dex: string;
    int: string;
    luk: string;
    max_hp: string;
    max_mp: string;
    attack_power: string;
    magic_power: string;
    armor: string;
    speed: string;
    jump: string;
}
export interface EquipmentTitleModelResponse {
    title_name: string;
    title_icon: string;
    title_description: string;
    date_expire: string;
    date_option_expire: string;
}
export interface MapleSymbolResponse {
    symbol_name: string;
    symbol_icon: string;
    symbol_description: string;
    symbol_force: string;
    symbol_level: number;
    symbol_str: string;
    symbol_dex: string;
    symbol_int: string;
    symbol_luk: string;
    symbol_hp: string;
    symbol_drop_rate: string;
    symbol_meso_rate: string;
    symbol_exp_rate: string;
    symbol_growth_count: number;
    symbol_require_growth_count: number;
}
