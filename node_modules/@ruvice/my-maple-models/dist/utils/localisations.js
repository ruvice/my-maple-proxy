import { MapleServer } from "../models/maple/Generic/enums";
import { CharacterClassLocalisationKMS, CharacterClassLocalisationSEA, ITEM_EQUIP_STAT_OPTIONS_KMS, ITEM_EQUIP_STAT_OPTIONS_SEA, STAT_KMS, STAT_SEA, SYMBOL_OPTIONS_KMS, SYMBOL_OPTIONS_SEA } from "./constants";
export function getLocalisedCharacterClass(characterClass, server) {
    if (server === MapleServer.KMS) {
        return CharacterClassLocalisationKMS[characterClass];
    }
    else if (server === MapleServer.SEA) {
        return CharacterClassLocalisationSEA[characterClass];
    }
    return CharacterClassLocalisationSEA[characterClass];
}
export function getLocalisedItemEquipOptions(itemEquipOption, server) {
    if (server === MapleServer.KMS) {
        return ITEM_EQUIP_STAT_OPTIONS_KMS[itemEquipOption];
    }
    else if (server === MapleServer.SEA) {
        return ITEM_EQUIP_STAT_OPTIONS_SEA[itemEquipOption];
    }
    return ITEM_EQUIP_STAT_OPTIONS_SEA[itemEquipOption];
}
export function getLocalisedSymbolEquipOptions(symbolEquipOption, server) {
    if (server === MapleServer.KMS) {
        return SYMBOL_OPTIONS_KMS[symbolEquipOption];
    }
    else if (server === MapleServer.SEA) {
        return SYMBOL_OPTIONS_SEA[symbolEquipOption];
    }
    return SYMBOL_OPTIONS_SEA[symbolEquipOption];
}
export function getLocalisedStatName(statName, server) {
    if (server === MapleServer.KMS) {
        return STAT_KMS[statName];
    }
    else if (server === MapleServer.SEA) {
        return STAT_SEA[statName];
    }
    return STAT_SEA[statName];
}
