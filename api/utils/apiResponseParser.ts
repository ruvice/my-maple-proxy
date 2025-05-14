import { 
    MapleSymbolResponse, Equipment, BasicCharacterInfo, ItemEquipInfo, MapleSymbol, Stat, StatInfo, 
    SymbolInfo, OpenAPICharacterBasicResponse, OpenAPIItemEquipmentResponse, OpenAPIStatResponse, 
    OpenAPISymbolEquipmentResponse, StatResponse  
} from "@ruvice/my-maple-models";
import { toNum, toBool } from "./apiDataTypeHelper";
import { CharacterClassMapping } from "./constants";
import { parseEquip } from "./parsers/equipmentParser";

export function parseBasicRes(res: OpenAPICharacterBasicResponse): BasicCharacterInfo {
    return {
        character_name: res.character_name,
        world_name: res.world_name,
        character_gender: res.character_gender,
        character_class_level: toNum(res.character_class_level),
        character_level: toNum(res.character_level),
        character_exp: toNum(res.character_exp),
        character_exp_rate: toNum(res.character_exp_rate),
        character_guild_name: res.character_guild_name,
        character_image: res.character_image,
        character_date_create: res.character_date_create,
        access_flag: toBool(res.access_flag),
        liberation_quest_clear_flag: toBool(res.liberation_quest_clear_flag)
    }
}

export function parseEquipRes(res: OpenAPIItemEquipmentResponse): ItemEquipInfo {
    const itemEquipment: Equipment[] = res.item_equipment.map((equip) => parseEquip(equip))
    const itemEquipmentPreset1: Equipment[] = res.item_equipment_preset_1.map((equip) => parseEquip(equip))
    const itemEquipmentPreset2: Equipment[] = res.item_equipment_preset_2.map((equip) => parseEquip(equip))
    const itemEquipmentPreset3: Equipment[] = res.item_equipment_preset_3.map((equip) => parseEquip(equip))
    const dragonEquipment: Equipment[] = res.dragon_equipment.map((equip) => parseEquip(equip))
    const mechanicEquipment: Equipment[] = res.mechanic_equipment.map((equip) => parseEquip(equip))
    const characterClass = CharacterClassMapping[res.character_class]
    return {
        date: res.date,
        character_gender: res.character_gender,
        character_class: characterClass,
        preset_no: toNum(res.preset_no),
        item_equipment: itemEquipment,
        item_equipment_preset_1: itemEquipmentPreset1,
        item_equipment_preset_2: itemEquipmentPreset2,
        item_equipment_preset_3: itemEquipmentPreset3,
        title: res.title,
        dragon_equipment: dragonEquipment,
        mechanic_equipment: mechanicEquipment
    }
}

export function parseSymbolRes(res: OpenAPISymbolEquipmentResponse): SymbolInfo {
    const symbol: MapleSymbol[] = res.symbol.map((symbol) => parseSymbol(symbol))
    const characterClass = CharacterClassMapping[res.character_class]
    return {
        date: "",
        character_class: characterClass,
        symbol: symbol
    }
}

function parseSymbol(symbol: MapleSymbolResponse): MapleSymbol {
    return {
        symbol_name: symbol.symbol_name,
        symbol_icon: symbol.symbol_icon,
        symbol_description: symbol.symbol_description,
        symbol_force: toNum(symbol.symbol_force),
        symbol_level: toNum(symbol.symbol_level),
        symbol_str: toNum(symbol.symbol_str),
        symbol_dex: toNum(symbol.symbol_dex),
        symbol_int: toNum(symbol.symbol_int),
        symbol_luk: toNum(symbol.symbol_luk),
        symbol_hp: toNum(symbol.symbol_hp),
        symbol_drop_rate: symbol.symbol_drop_rate,
        symbol_meso_rate: symbol.symbol_meso_rate,
        symbol_exp_rate: symbol.symbol_exp_rate,
        symbol_growth_count: toNum(symbol.symbol_growth_count),
        symbol_require_growth_count: toNum(symbol.symbol_require_growth_count)
    }
}

export function parseStatRes(res: OpenAPIStatResponse): StatInfo {
    const characterClass = CharacterClassMapping[res.character_class]
    const finalStat = res.final_stat.map((stat) => parseStat(stat))
    return {
        date: res.date,
        character_class: characterClass,
        final_stat: finalStat,
        remain_ap: res.remain_ap
    }
}

function parseStat(stat: StatResponse): Stat {
    return {
        stat_name: stat.stat_name,
        stat_value: toNum(stat.stat_value)
    }
}