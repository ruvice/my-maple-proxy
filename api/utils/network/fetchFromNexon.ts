import { MapleServer, Ocid, OpenAPIOcidQueryResponse } from "@ruvice/my-maple-models";
import { AppError, ErrorCode } from "./AppError";
export type ProxyOCIDRequest = {
    characterName: string;
    server: MapleServer;
}

export type ProxyRequest = {
    ocid: Ocid;
    path: string;
    date?: string;
    server: MapleServer
}

const OCID_PATH = "v1/id";

export const getOCID = async <T>(params: ProxyOCIDRequest) => {
    const { characterName, server } = params;
    const apiKey = server === MapleServer.KMS ? process.env.KMS_OPEN_API_KEY : process.env.SEA_OPEN_API_KEY;
    const serverPath = server === MapleServer.KMS ? 'maplestory/' : 'maplestorysea/'
    const url = new URL(`https://open.api.nexon.com/${serverPath + OCID_PATH}`);
    url.searchParams.set("character_name", characterName)
    console.log(url.toString())
    if (!apiKey) {
        throw new AppError(ErrorCode.MISSING_API_KEY, 500)
    }

    if (!characterName) {
        throw new AppError(ErrorCode.INVALID_CHARACTER_NAME, 400)
    }

    try {
        const response = await fetch(url.toString(), {
            headers: { "x-nxopen-api-key": apiKey }
        });
        if (!response.ok) {
            const errorText = await response.text();
            throw new AppError(ErrorCode.NEXON_FAILED, response.status, `Nexon API error ${response.status}: ${errorText}`);
        }
        const data: OpenAPIOcidQueryResponse = await response.json()
        return data
    } catch (err) {
        if (err instanceof Error) {
            throw new AppError(ErrorCode.UNKNOWN, 500, err.message);
        }
        throw new AppError(ErrorCode.UNKNOWN, 500); 
    }
}

export const getFromProxy = async <T>(params: ProxyRequest) => {
    const { path, ocid,  date, server } = params;
    const apiKey = server === MapleServer.KMS ? process.env.KMS_OPEN_API_KEY : process.env.SEA_OPEN_API_KEY;
    const serverPath = server === MapleServer.KMS ? 'maplestory/' : 'maplestorysea/'
    const url = new URL(`https://open.api.nexon.com/${serverPath + path}`);
    url.searchParams.set("ocid", ocid);
    if (date) {
        url.searchParams.set("date", date);
    }
    console.log(url.toString())

    if (!apiKey) {
        return new AppError(ErrorCode.MISSING_API_KEY, 500)
    }

    if (!ocid) {
        return new AppError(ErrorCode.INVALID_OCID, 400)
    }
    
    try {
        const response = await fetch(url.toString(), {
            headers: { "x-nxopen-api-key": apiKey }
        });
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Nexon API error ${response.status}: ${errorText}`);
        }
        const data: T = await response.json()
        // console.log(data)
        return data;
    } catch (err) {
        throw err;
    }
};
