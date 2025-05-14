import { EquipmentResponse, EquipmentTitleModelResponse, MapleSymbolResponse } from './equipmentTypes';
export type Ocid = string;
export interface CharacterMap {
    [ocid: string]: string;
}
export interface OpenAPIOcidQueryResponse {
    ocid: string;
}
export interface OpenAPICharacterBasicResponse {
    date: string;
    character_name: string;
    world_name: string;
    character_gender: string;
    character_class: string;
    character_class_level: string;
    character_level: number;
    character_exp: number;
    character_exp_rate: string;
    character_guild_name: string;
    character_image: string;
    character_date_create: string;
    access_flag: string;
    liberation_quest_clear_flag: string;
}
export interface ExpData {
    date: string;
    exp: number;
    exp_rate: string;
}
export interface OpenAPIItemEquipmentResponse {
    date: string;
    character_gender: string;
    character_class: string;
    preset_no: number;
    item_equipment: EquipmentResponse[];
    item_equipment_preset_1: EquipmentResponse[];
    item_equipment_preset_2: EquipmentResponse[];
    item_equipment_preset_3: EquipmentResponse[];
    title: EquipmentTitleModelResponse;
    dragon_equipment: EquipmentResponse[];
    mechanic_equipment: EquipmentResponse[];
}
export interface OpenAPISymbolEquipmentResponse {
    date: string;
    character_class: string;
    symbol: MapleSymbolResponse[];
}
export interface OpenAPIStatResponse {
    date: string;
    character_class: string;
    final_stat: StatResponse[];
    remain_ap: number;
}
export interface StatResponse {
    stat_name: string;
    stat_value: string;
}
