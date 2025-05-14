import { ItemTotalOptionResponse, ItemBaseOptionResponse, ItemExceptionalOptionResponse, ItemAddOptionResponse, ItemEtcOptionResponse, ItemStarForceOptionResponse, EquipmentResponse } from "../../../equipmentTypes"
import { Equipment } from "../../../models/maple/Equipment/equipmentTypes";
import { ItemTotalOption, ItemBaseOption, ItemExceptionalOption, ItemAddOption, ItemEtcOption, ItemStarForceOption } from "../../../models/maple/Equipment/options"
import { toBool, toNum } from "../apiDataTypeHelper"
import { ItemEquipmentSlotMapping, PotentialMapping } from "../constants";

export function parseEquip(res: EquipmentResponse): Equipment {
    const normalisedEquipmentSlot = res.item_equipment_slot.toLowerCase().replace(/\s+/g, '');
    const itemEquipmentSlot = ItemEquipmentSlotMapping[normalisedEquipmentSlot]
    const itemPotential = PotentialMapping[res.potential_option_grade]
    const addItemPotential = PotentialMapping[res.additional_potential_option_grade]
    const itemTotalOption = parseItemTotalOption(res.item_total_option)
    const itemBaseOption = parseItemBaseOption(res.item_base_option)
    const itemExceptionalOption = parseItemExceptionalOption(res.item_exceptional_option)
    const itemAddOption = parseItemAddOption(res.item_add_option)
    const itemEtcOption = parseItemEtcOption(res.item_etc_option)
    const itemStarforceOption = parseItemStarforceOption(res.item_starforce_option)
    const maxStarforce = getMaximumStars(
        toNum(res.scroll_upgrade), 
        toNum(res.scroll_upgradeable_count), 
        toNum(res.scroll_resilience_count), 
        toNum(res.item_base_option.base_equipment_level),
        res.item_name
    )
    return {
        item_equipment_part: res.item_equipment_part,
        item_equipment_slot: itemEquipmentSlot,
        item_name: res.item_name,
        item_icon: res.item_icon,
        item_description: res.item_description,
        item_shape_name: res.item_shape_name,
        item_shape_icon: res.item_shape_icon,
        item_gender: res.item_gender,
        item_total_option: itemTotalOption,
        item_base_option: itemBaseOption,
        potential_option_grade: itemPotential,
        additional_potential_option_grade: addItemPotential,
        potential_option_flag: toBool(res.potential_option_flag),
        potential_option_1: res.potential_option_1,
        potential_option_2: res.potential_option_2,
        potential_option_3: res.potential_option_3,
        additional_potential_option_flag: toBool(res.additional_potential_option_flag),
        additional_potential_option_1: res.additional_potential_option_1,
        additional_potential_option_2: res.additional_potential_option_2,
        additional_potential_option_3: res.additional_potential_option_3,
        equipment_level_increase: res.equipment_level_increase,
        item_exceptional_option: itemExceptionalOption,
        item_add_option: itemAddOption,
        growth_exp: toNum(res.growth_exp),
        growth_level: toNum(res.growth_level),
        scroll_upgrade: toNum(res.scroll_upgrade),
        cuttable_count: toNum(res.cuttable_count),
        golden_hammer_flag: res.golden_hammer_flag,
        scroll_resilience_count: toNum(res.scroll_resilience_count),
        scroll_upgradeable_count: toNum(res.scroll_upgradeable_count),
        soul_name: res.soul_name,
        soul_option: res.soul_option,
        item_etc_option: itemEtcOption,
        starforce: toNum(res.starforce),
        starforce_scroll_flag: res.starforce_scroll_flag,
        item_starforce_option: itemStarforceOption,
        special_ring_level: toNum(res.special_ring_level),
        date_expire: res.date_expire,
        maxStarforce: maxStarforce
    }
}

function parseItemTotalOption(option: ItemTotalOptionResponse): ItemTotalOption {
    return {
        str: toNum(option.str),
        dex: toNum(option.dex),
        int: toNum(option.int),
        luk: toNum(option.luk),
        max_hp: toNum(option.max_hp),
        max_mp: toNum(option.max_mp),
        attack_power: toNum(option.attack_power),
        magic_power: toNum(option.magic_power),
        armor: toNum(option.armor),
        speed: toNum(option.speed),
        jump: toNum(option.jump),
        boss_damage: toNum(option.boss_damage),
        ignore_monster_armor: toNum(option.ignore_monster_armor),
        all_stat: toNum(option.all_stat),
        damage: toNum(option.damage),
        equipment_level_decrease: toNum(option.equipment_level_decrease),
        max_hp_rate: toNum(option.max_hp_rate),
        max_mp_rate: toNum(option.max_mp_rate)
    }
}

function parseItemBaseOption(option: ItemBaseOptionResponse): ItemBaseOption {
    return {
        str: toNum(option.str),
        dex: toNum(option.dex),
        int: toNum(option.int),
        luk: toNum(option.luk),
        max_hp: toNum(option.max_hp),
        max_mp: toNum(option.max_mp),
        attack_power: toNum(option.attack_power),
        magic_power: toNum(option.magic_power),
        armor: toNum(option.armor),
        speed: toNum(option.speed),
        jump: toNum(option.jump),
        boss_damage: toNum(option.boss_damage),
        ignore_monster_armor: toNum(option.ignore_monster_armor),
        all_stat: toNum(option.all_stat),
        max_hp_rate: toNum(option.max_hp_rate),
        max_mp_rate: toNum(option.max_mp_rate),
        base_equipment_level: toNum(option.base_equipment_level)
    }
}

function parseItemExceptionalOption(option: ItemExceptionalOptionResponse): ItemExceptionalOption {
    return {
        str: toNum(option.str),
        dex: toNum(option.dex),
        int: toNum(option.int),
        luk: toNum(option.luk),
        max_hp: toNum(option.max_hp),
        max_mp: toNum(option.max_mp),
        attack_power: toNum(option.attack_power),
        magic_power: toNum(option.magic_power),
        exceptional_upgrade: toNum(option.exceptional_upgrade)
    }
}

function parseItemAddOption(option: ItemAddOptionResponse): ItemAddOption {
    return {
        str: toNum(option.str),
        dex: toNum(option.dex),
        int: toNum(option.int),
        luk: toNum(option.luk),
        max_hp: toNum(option.max_hp),
        max_mp: toNum(option.max_mp),
        attack_power: toNum(option.attack_power),
        magic_power: toNum(option.magic_power),
        armor: toNum(option.armor),
        speed: toNum(option.speed),
        jump: toNum(option.jump),
        boss_damage: toNum(option.boss_damage),
        damage: toNum(option.damage),
        all_stat: toNum(option.all_stat),
        equipment_level_decrease: toNum(option.equipment_level_decrease)
    }
}

function parseItemEtcOption(option: ItemEtcOptionResponse): ItemEtcOption {
    return {
        str: toNum(option.str),
        dex: toNum(option.dex),
        int: toNum(option.int),
        luk: toNum(option.luk),
        max_hp: toNum(option.max_hp),
        max_mp: toNum(option.max_mp),
        attack_power: toNum(option.attack_power),
        magic_power: toNum(option.magic_power),
        armor: toNum(option.armor),
        speed: toNum(option.speed),
        jump: toNum(option.jump)
    }
}

 function parseItemStarforceOption(option: ItemStarForceOptionResponse): ItemStarForceOption {
    return {
        str: toNum(option.str),
        dex: toNum(option.dex),
        int: toNum(option.int),
        luk: toNum(option.luk),
        max_hp: toNum(option.max_hp),
        max_mp: toNum(option.max_mp),
        attack_power: toNum(option.attack_power),
        magic_power: toNum(option.magic_power),
        armor: toNum(option.armor),
        speed: toNum(option.speed),
        jump: toNum(option.jump)
    }
}

function getMaximumStars(
    currentScrollCount: number, 
    upgradeableCount: number, 
    resilienceCount: number,
    equipmentLevel: number,
    equipmentName: string
): number {
    if (isSuperiorEquip(equipmentName)) {
        return getStarsForSuperiorEquip(equipmentLevel);
    }

    if (currentScrollCount === 0 && upgradeableCount === 0 && resilienceCount === 0) {
        return 0;
    }
    
    return getStarsForEquip(equipmentLevel);
    
}

function isSuperiorEquip(equipmentName: string) {
    // Check for superior equipment
    const superiorEquipKeywords = ["tyrant", "nova", "elite heliseum"];
    const name = equipmentName.toLowerCase();

    return (superiorEquipKeywords.some(keyword => name.includes(keyword)));
}

function getStarsForSuperiorEquip(equipmentLevel: number) {
    if (equipmentLevel < 95) {
            return 3
    } else if (equipmentLevel < 108) {
        return 5
    } else if (equipmentLevel < 118) {
        return 8
    } else if (equipmentLevel < 128) {
        return 10
    } else {
        return 15
    }
}

function getStarsForEquip(equipmentLevel: number) {
    if (equipmentLevel < 95) {
        return 5
    } else if (equipmentLevel < 108) {
        return 8
    } else if (equipmentLevel < 118) {
        return 10
    } else if (equipmentLevel < 128) {
        return 15
    } else if (equipmentLevel < 138) {
        return 20
    } else {
        return 30
    }
}