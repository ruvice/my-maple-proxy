import { Ocid, OpenAPIOcidQueryResponse } from "../../types";
import { AppError, ErrorCode } from "./AppError";
export type ProxyOCIDRequest = {
    characterName: string;
}

export type ProxyRequest = {
    ocid: Ocid;
    path: string;
    date: string;
}

const OCID_PATH = "maplestorysea/v1/id";

export const getOCID = async <T>(params: ProxyOCIDRequest) => {
    const url = new URL(`https://open.api.nexon.com/${OCID_PATH}`);
    const characterName = params.characterName;
    url.searchParams.set("character_name", characterName)
    console.log(url.toString())
    const apiKey = process.env.OPEN_API_KEY2;
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
    const path = params.path;
    const ocid = params.ocid;
    const date = params.date;
    const url = new URL(`https://open.api.nexon.com/${path}`);
    url.searchParams.set("ocid", ocid);
    url.searchParams.set("date", date);
    console.log(url.toString())

    const apiKey = process.env.OPEN_API_KEY2;
    if (!apiKey) {
        return new Response(JSON.stringify({ error: "Missing env vars" }), {
            status: 500,
            headers: { 
                "Content-Type": "application/json", 
                "Access-Control-Allow-Origin": origin 
            },
        });
    }

    if (!ocid || !date) {
        return new Response(JSON.stringify({ error: "Bad request params" }), {
            status: 400,
            headers: { 
                "Content-Type": "application/json", 
                "Access-Control-Allow-Origin": origin 
            },
        });
    }

    try {
        const response = await fetch(url.toString(), {
            headers: { "x-nxopen-api-key": apiKey }
        });
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Nexon API error ${response.status}: ${errorText}`);
        }
        const data = await response.json()
        console.log(data)
        return data;
    } catch (err) {
        throw err;
    }
};
