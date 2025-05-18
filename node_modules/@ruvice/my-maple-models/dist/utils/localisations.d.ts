import { ItemEquipOption, SymbolEquipOption } from "../models/maple/Equipment/equipmentTypes";
import { CharacterClass, MapleServer, StatName } from "../models/maple/Generic/enums";
export declare function getLocalisedCharacterClass(characterClass: CharacterClass, server: MapleServer): string;
export declare function getLocalisedItemEquipOptions(itemEquipOption: ItemEquipOption, server: MapleServer): string;
export declare function getLocalisedSymbolEquipOptions(symbolEquipOption: SymbolEquipOption, server: MapleServer): string;
export declare function getLocalisedStatName(statName: StatName, server: MapleServer): string;
