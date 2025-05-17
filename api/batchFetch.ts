import { Ocid, OpenAPIStatResponse, OpenAPICharacterBasicResponse, OpenAPIItemEquipmentResponse, OpenAPIOcidQueryResponse, OpenAPISymbolEquipmentResponse, ExpData, MapleServer } from "@ruvice/my-maple-models"
import { Character } from "@ruvice/my-maple-models";
import { parseBasicRes, parseEquipRes, parseStatRes, parseSymbolRes } from "./utils/apiResponseParser";
import { AppError } from "./utils/network/AppError";
import { getFromProxy, getOCID, ProxyOCIDRequest } from "./utils/network/fetchFromNexon";
import { delay, getAPIDate, getAPIDateForXDaysAgo, getCurrentDateTimeInSGT, getNext2amSGTEpoch } from "./utils/network/helper";
import { toMapleServer } from "./utils/constants";

const BASIC_PATH = "v1/character/basic";
const ITEM_PATH = "v1/character/item-equipment";
const SYMBOL_PATH = "v1/character/symbol-equipment";
const STAT_PATH = "v1/character/stat";

const fetchCharacterBasic = async (ocid: Ocid, server: MapleServer) => getFromProxy<OpenAPICharacterBasicResponse>({'path': BASIC_PATH, "ocid": ocid, "server": server});
const fetchCharacterItemEquip = async (ocid: Ocid, server: MapleServer) => getFromProxy<OpenAPIItemEquipmentResponse>({'path': ITEM_PATH, "ocid": ocid, "server": server});
const fetchCharacterSymbol = async (ocid: Ocid, server: MapleServer) => getFromProxy<OpenAPISymbolEquipmentResponse>({'path': SYMBOL_PATH, "ocid": ocid, "server": server});
const fetchCharacterEXP = async (ocid: Ocid, server: MapleServer, offset: number) => 
   getFromProxy<OpenAPICharacterBasicResponse>({'path': BASIC_PATH, "ocid": ocid, "server": server, "date": getAPIDateForXDaysAgo(offset)});
const fetchCharacterStat = async (ocid: Ocid, server: MapleServer) => getFromProxy<OpenAPIStatResponse>({'path': STAT_PATH, "ocid": ocid, "server": server});
export default async function handler(req: Request): Promise<Response> {
    const { searchParams } = new URL(req.url, `http://localhost`);
  
    const characterName = searchParams.get("character_name");
    const serverParam = searchParams.get("server") ?? 'SEA';
    const server = toMapleServer(serverParam);
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
  
    if (!characterName || !server) {
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
        characterName: characterName,
        server: server
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
        fetchCharacterBasic(ocid, server),
        fetchCharacterItemEquip(ocid, server),
        fetchCharacterSymbol(ocid, server),
        fetchCharacterStat(ocid, server)
    ]);
    
    if (!(basicRes instanceof AppError)) {
        character.basic = parseBasicRes(basicRes, server)
        const expData: ExpData = {
            date: getCurrentDateTimeInSGT(),
            exp: basicRes.character_exp,
            exp_rate: basicRes.character_exp_rate
        };
        const progression = character?.expProgression ?? [];
        character.expProgression = [...progression, expData]
    }

    if (!(equipRes instanceof AppError)) {
        character.equips = parseEquipRes(equipRes, server)
    }

    if (!(symbolRes instanceof AppError)) {
        character.symbol = parseSymbolRes(symbolRes, server)
    }

    if (!(statRes instanceof AppError)) {
        character.stat = parseStatRes(statRes, server)
    }
    
    for (let i = 1; i < 5; i++) {
        await delay(500);
        const expRes = await fetchCharacterEXP(ocid, server, i);
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
    const ttl = 20 * 60;

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