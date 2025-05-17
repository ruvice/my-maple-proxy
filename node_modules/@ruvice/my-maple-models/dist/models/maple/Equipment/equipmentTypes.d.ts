import { Potential } from "../Generic/enums";
import { ItemAddOption, ItemBaseOption, ItemEtcOption, ItemExceptionalOption, ItemStarForceOption, ItemTotalOption } from "./options";
export interface Equipment {
    item_equipment_part: string;
    item_equipment_slot: ItemEquipmentSlot;
    item_name: string;
    item_icon: string;
    item_description: string;
    item_shape_name: string;
    item_shape_icon: string;
    item_gender: string;
    item_total_option: ItemTotalOption;
    item_base_option: ItemBaseOption;
    potential_option_grade: Potential;
    additional_potential_option_grade: Potential;
    potential_option_flag: boolean;
    potential_option_1: string;
    potential_option_2: string;
    potential_option_3: string;
    additional_potential_option_flag: boolean;
    additional_potential_option_1: string;
    additional_potential_option_2: string;
    additional_potential_option_3: string;
    equipment_level_increase: number;
    item_exceptional_option: ItemExceptionalOption;
    item_add_option: ItemAddOption;
    growth_exp: number;
    growth_level: number;
    scroll_upgrade: number;
    cuttable_count: number;
    golden_hammer_flag: string;
    scroll_resilience_count: number;
    scroll_upgradeable_count: number;
    soul_name: string;
    soul_option: string;
    item_etc_option: ItemEtcOption;
    starforce: number;
    starforce_scroll_flag: string;
    item_starforce_option: ItemStarForceOption;
    special_ring_level: number;
    date_expire: string;
    maxStarforce: number;
}
export declare enum ItemEquipmentSlot {
    Ring1 = "Ring1",
    Ring2 = "Ring2",
    Ring3 = "Ring3",
    Ring4 = "Ring4",
    Pendant = "Pendant",
    Pendant2 = "Pendant2",
    Weapon = "Weapon",
    Belt = "Belt",
    Hat = "Hat",
    FaceAccessory = "FaceAccessory",
    EyeAccessory = "EyeAccessory",
    Top = "Top",
    Bottom = "Bottom",
    Shoes = "Shoes",
    Earring = "Earring",
    ShoulderDecoration = "ShoulderDecoration",
    Glove = "Glove",
    Emblem = "Emblem",
    Badge = "Badge",
    Medal = "Medal",
    SecondaryWeapons = "SecondaryWeapons",
    Cape = "Cape",
    MechanicalHeart = "MechanicalHeart",
    PocketItem = "PocketItem"
}
export type EquipmentTitleModel = {
    title_name: string;
    title_icon: string;
    title_description: string;
    date_expire: string;
    date_option_expire: string;
};
export declare enum ItemEquipOption {
    Str = "str",
    Dex = "dex",
    Int = "int",
    Luk = "luk",
    MaxHp = "max_hp",
    MaxMp = "max_mp",
    MaxHpRate = "max_hp_rate",
    MaxMpRate = "max_mp_rate",
    AttackPower = "attack_power",
    MagicPower = "magic_power",
    Armor = "armor",
    BossDamage = "boss_damage",
    IgnoreMonsterArmor = "ignore_monster_armor",
    Damage = "damage",
    Speed = "speed",
    Jump = "jump",
    AllStat = "all_stat",
    EquipmentLevelDecrease = "equipment_level_decrease"
}
export declare enum SymbolEquipOption {
    SymbolLevel = "symbol_level",
    Growth = "growth",
    Str = "symbol_str",
    Dex = "symbol_dex",
    Int = "symbol_int",
    Luk = "symbol_luk",
    Hp = "symbol_hp",
    ExpRate = "symbol_exp_rate",
    MesoRate = "symbol_meso_rate",
    DropRate = "symbol_drop_rate"
}
