import { EquipmentTitleModel } from "./Equipment/equipmentTypes";
import { ExpData, Ocid } from "../api/apiTypes";
import { Equipment } from "./Equipment/equipmentTypes";
import { CharacterClass, StatName, SymbolRegion } from "./Generic/enums";
export interface Character {
    name: string;
    ocid: Ocid;
    basic?: BasicCharacterInfo;
    error?: string;
    equips?: ItemEquipInfo;
    symbol?: SymbolInfo;
    expProgression?: ExpData[];
    stat?: StatInfo;
}
export interface BasicCharacterInfo {
    date: string;
    character_name: string;
    world_name: string;
    character_gender: string;
    character_class: CharacterClass;
    character_class_level: number;
    character_level: number;
    character_exp: number;
    character_exp_rate: number;
    character_guild_name: string;
    character_image: string;
    character_date_create: string;
    access_flag: boolean;
    liberation_quest_clear_flag: boolean;
}
export interface ItemEquipInfo {
    date: string;
    character_gender: string;
    character_class: CharacterClass;
    preset_no: number;
    item_equipment: Equipment[];
    item_equipment_preset_1: Equipment[];
    item_equipment_preset_2: Equipment[];
    item_equipment_preset_3: Equipment[];
    title: EquipmentTitleModel;
    dragon_equipment: Equipment[];
    mechanic_equipment: Equipment[];
}
export interface SymbolInfo {
    date: string;
    character_class: CharacterClass;
    symbol: MapleSymbol[];
}
export interface MapleSymbol {
    [key: string]: string | number;
    symbol_name: string;
    symbol_icon: string;
    symbol_description: string;
    symbol_force: number;
    symbol_level: number;
    symbol_str: number;
    symbol_dex: number;
    symbol_int: number;
    symbol_luk: number;
    symbol_hp: number;
    symbol_drop_rate: string;
    symbol_meso_rate: string;
    symbol_exp_rate: string;
    symbol_growth_count: number;
    symbol_require_growth_count: number;
    region: SymbolRegion;
}
export interface StatInfo {
    date: string;
    character_class: CharacterClass;
    final_stat: Stat[];
    remain_ap: number;
}
export interface Stat {
    stat_name: StatName;
    stat_value: number;
}
