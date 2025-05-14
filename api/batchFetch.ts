import { Ocid, OpenAPIStatResponse, OpenAPICharacterBasicResponse, OpenAPIItemEquipmentResponse, OpenAPIOcidQueryResponse, OpenAPISymbolEquipmentResponse, ExpData } from "@ruvice/my-maple-models"
import { Character } from "@ruvice/my-maple-models";
import { parseBasicRes, parseEquipRes, parseStatRes, parseSymbolRes } from "./utils/apiResponseParser";
import { AppError } from "./utils/network/AppError";
import { getFromProxy, getOCID, ProxyOCIDRequest } from "./utils/network/fetchFromNexon";
import { delay, getAPIDate, getAPIDateForXDaysAgo, getNext2amSGTEpoch } from "./utils/network/helper";

const BASIC_PATH = "maplestorysea/v1/character/basic";
const ITEM_PATH = "maplestorysea/v1/character/item-equipment";
const SYMBOL_PATH = "maplestorysea/v1/character/symbol-equipment";
const STAT_PATH = "maplestorysea/v1/character/stat";

const fetchCharacterBasic = async (ocid: Ocid) => getFromProxy<OpenAPICharacterBasicResponse>({'path': BASIC_PATH, "ocid": ocid, "date": getAPIDate()});
const fetchCharacterItemEquip = async (ocid: Ocid) => getFromProxy<OpenAPIItemEquipmentResponse>({'path': ITEM_PATH, "ocid": ocid, "date": getAPIDate()});
const fetchCharacterSymbol = async (ocid: Ocid) => getFromProxy<OpenAPISymbolEquipmentResponse>({'path': SYMBOL_PATH, "ocid": ocid, "date": getAPIDate()});
const fetchCharacterEXP = async (ocid: Ocid, offset: number) => 
   getFromProxy<OpenAPICharacterBasicResponse>({'path': BASIC_PATH, "ocid": ocid, "date": getAPIDateForXDaysAgo(offset)});
const fetchCharacterStat = async (ocid: Ocid) => getFromProxy<OpenAPIStatResponse>({'path': STAT_PATH, "ocid": ocid, "date": getAPIDate()});
export default async function handler(req: Request): Promise<Response> {
    const { searchParams } = new URL(req.url, `http://localhost`);
  
    const characterName = searchParams.get("character_name");
    const allowedOrigins = [
        "https://localhost:8080",
        "https://extension-files.twitch.tv",
        "https://vgxcnnkl2o4t2k8fbdrqszhbphh9pc.ext-twitch.tv"
    ];
      
    const origin = req.headers.get("origin");
      
    if (!origin || !allowedOrigins.some(o => origin.startsWith(o))) {
        return new Response(JSON.stringify({ error: "Forbidden" }), {
            status: 403,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "null" // block
            }
        });
    }
  
    if (!characterName) {
        return new Response(JSON.stringify({ error: "Bad request params" }), {
            status: 400,
            headers: { 
                "Content-Type": "application/json", 
                "Access-Control-Allow-Origin": origin 
            },
        });
    }

    // At this point we have a valid incoming request
    const ocidRequest: ProxyOCIDRequest = {
        characterName: characterName
    }
    const ocidRes = await getOCID<OpenAPIOcidQueryResponse>(ocidRequest)
    if (ocidRes instanceof AppError)  {
        return handleError(ocidRes, origin);
    }
    const ocid = ocidRes.ocid;
    // Fetch the rest and build Character model
    const character: Character = {
        name: characterName,
        ocid: ocid
    }

    const [basicRes, equipRes, symbolRes, statRes] = await Promise.all([
        fetchCharacterBasic(ocid),
        fetchCharacterItemEquip(ocid),
        fetchCharacterSymbol(ocid),
        fetchCharacterStat(ocid)
    ]);
    
    if (!(basicRes instanceof AppError)) {
        character.basic = parseBasicRes(basicRes)
        const expData: ExpData = {
            date: basicRes.date,
            exp: basicRes.character_exp,
            exp_rate: basicRes.character_exp_rate
        };
        const progression = character?.expProgression ?? [];
        character.expProgression = [...progression, expData]
    }

    if (!(equipRes instanceof AppError)) {
        character.equips = parseEquipRes(equipRes)
    }

    if (!(symbolRes instanceof AppError)) {
        character.symbol = parseSymbolRes(symbolRes)
    }

    if (!(statRes instanceof AppError)) {
        character.stat = parseStatRes(statRes)
    }
    
    for (let i = 1; i < 5; i++) {
        await delay(500);
        const expRes = await fetchCharacterEXP(ocid, i);
        if (!(expRes instanceof AppError)) {
            const expData: ExpData = {
                date: expRes.date,
                exp: expRes.character_exp,
                exp_rate: expRes.character_exp_rate
            };
            const progression = character?.expProgression ?? [];
            character.expProgression = [...progression, expData]
        }
    }

    const targetEpoch = getNext2amSGTEpoch(); // your desired expiry
    const now = Math.floor(Date.now() / 1000);
    const ttl = Math.max(0, targetEpoch - now);

    return new Response(JSON.stringify(character), {
        status: 200,
        headers: { 
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": origin,
            'Cache-Control': `s-maxage=${ttl}, stale-while-revalidate=60`
        },
    });
}

function handleError(error: AppError, origin: string) {
    return new Response(error.message, {
        status: error.status,
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": origin // block
        }
    });
}

export const config = {
    runtime: "edge",
};